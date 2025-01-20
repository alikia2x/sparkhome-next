import { useEffect, useRef } from "react";
import SuggestionBox from "./suggestionBox";
import { queryAtom } from "lib/state/query";
import { SuggestionItem, SuggestionsResponse } from "global";
import { getLocalizedSearchEngineName } from "lib/onesearch/getSearchEngine.ts";
import { suggestionAtom } from "lib/state/suggestion";
import validLink from "lib/url/validLink";
import { selectedSuggestionAtom } from "lib/state/suggestionSelection";
import { sendError } from "lib/feedback/sendError";
import { useAtom, useAtomValue } from "jotai";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { keywordSuggestion } from "lib/onesearch/keywordSuggestion";
import { searchboxLastInputAtom } from "lib/state/searchboxLastInput";
import SuggestionComponent from "./SuggestionItem.tsx";
import { searchEngineAtom } from "../../lib/state/searchEngine.ts";

export default function OneSearch() {
	const [suggestion, setFinalSuggestion] = useAtom(suggestionAtom);
	const lastInput = useAtomValue(searchboxLastInputAtom);
	const lastRequestTimeRef = useRef(0);
	const selected = useAtomValue(selectedSuggestionAtom);
	const currentEngine = useAtomValue(searchEngineAtom);
	const devMode = false;
	const query = useAtomValue(queryAtom);
	const engineName = getLocalizedSearchEngineName(currentEngine);
	const { t } = useTranslation();
	const lang = i18next.language;

	useEffect(() => {
		const time = new Date().getTime().toString();
		if (query.trim() === "" || query.length > 120) {
			cleanSuggestion("QUERY", "NAVIGATION");
			return;
		}
		fetch(`/api/v1/suggestion?q=${query}&l=${lang}&t=${time}&engine=${currentEngine.name}`)
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
					prompt: <span>{t("search.goto-help-text")}</span>
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
		<SuggestionBox style="image">
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
