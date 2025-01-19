import { useEffect, useRef } from "react";
import SuggestionBox from "./suggestionBox";
import { queryAtom } from "lib/state/query";
import { SuggestionItem, SuggestionsResponse } from "global";
import getSearchEngineName from "lib/onesearch/getSearchEngineName";
import { suggestionAtom } from "lib/state/suggestion";
import validLink from "lib/url/validLink";
import { selectedSuggestionAtom } from "lib/state/suggestionSelection";
import { settingsAtom } from "lib/state/settings";
import { sendError } from "lib/feedback/sendError";
import { useAtom, useAtomValue } from "jotai";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { keywordSuggestion } from "lib/onesearch/keywordSuggestion";
import { searchboxLastInputAtom } from "lib/state/searchboxLastInput"
import SuggestionComponent from "./SuggestionItem.tsx";

export default function OneSearch() {
	const [suggestion, setFinalSuggestion] = useAtom(suggestionAtom);
	const lastInput = useAtomValue(searchboxLastInputAtom);
	const lastRequestTimeRef = useRef(0);
	const selected = useAtomValue(selectedSuggestionAtom);
	const settings = useAtomValue(settingsAtom);
	const devMode = false;
	const query = useAtomValue(queryAtom);
	const engineName = getSearchEngineName();
	const engine = settings.currentSearchEngine;
	const { t } = useTranslation();
	const lang = i18next.language;

	useEffect(() => {
		const time = new Date().getTime().toString();
		if (query.trim() === "" || query.length > 120) {
			cleanSuggestion("QUERY", "NAVIGATION");
			return;
		}
		fetch(`/api/v1/suggestion?q=${query}&l=${lang}&t=${time}&engine=${engine}`)
			.then((res) => res.json())
			.then((data: SuggestionsResponse) => {
				try {
					const suggestionToUpdate: SuggestionItem[] = data.suggestions;
					if (data.time > lastRequestTimeRef.current) {
						cleanSuggestion("NAVIGATION", "QUERY");
						lastRequestTimeRef.current = data.time;
						updateSuggestion(suggestionToUpdate);
					}
				} catch (error: Error | unknown) {
					if (error instanceof Error) {
						sendError(error);
					}
				}
			})
			.catch((error) => {
				// Handle fetch error
				sendError(error);
			});
	}, [lastInput]);

	function updateSuggestion(data: SuggestionItem[]) {
		setFinalSuggestion((cur: SuggestionItem[]) => {
			const types: string[] = [];
			for (const sug of data) {
				if (!types.includes(sug.type)) types.push(sug.type);
			}
			for (const type of types) {
				cur = cur.filter((item) => {
					return item.type !== type;
				});
			}
			return cur.concat(data).sort((a, b) => {
				return b.relevance - a.relevance;
			});
		});
	}

	function cleanSuggestion(...types: string[]) {
		setFinalSuggestion((suggestion: SuggestionItem[]) => {
			return suggestion.filter((item) => {
				return !types.includes(item.type);
			});
		});
	}

	useEffect(() => {
		cleanSuggestion("default-link", "default", "text", "link", "inpage-link");
		if (validLink(query)) {
			updateSuggestion([
				{
					type: "default-link",
					suggestion: query,
					relevance: 3000,
					prompt: <span>Go to: </span>
				},
				{ type: "default", suggestion: query, relevance: 1600 }
			]);
		} else {
			updateSuggestion([
				{
					type: "default",
					suggestion: query,
					relevance: 2000
				}
			]);
		}
		if (keywordSuggestion(query) !== null) {
			updateSuggestion([keywordSuggestion(query)!]);
		}
	}, [lastInput, engineName]);

	return (
		<SuggestionBox>
			{suggestion.map((s, i) => (
				<SuggestionComponent
					key={i}
					s={s}
					i={i}
					selected={selected}
					devMode={devMode}
					engineName={engineName}
					t={t}
				/>
			))}
		</SuggestionBox>
	);
}
