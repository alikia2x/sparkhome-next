import { settingsType, SuggestionItem } from "global";
import copyToClipboard from "lib/copy";
import { normalizeURL } from "lib/normalizeURL";
import search from "lib/search";

export default function (
	index: number,
	suggestion: SuggestionItem[],
	_query: string,
	settings: settingsType,
	searchBoxRef: React.RefObject<HTMLInputElement>
) {
	const selected = suggestion[index];
	const engine = settings.searchEngines[settings.currentSearchEngine];
	const newTab = settings.searchInNewTab;
	//let clipboard: any;
	if (selected.type === "QUERY" || selected.type === "default") {
		search(selected.suggestion, engine, newTab);
	} else if (selected.type === "NAVIGATION" || selected.type === "default-link") {
		window.open(normalizeURL(selected.suggestion));
	} else if (selected.type === "text") {
		console.log("????");
		copyToClipboard(selected.suggestion);
		searchBoxRef.current?.focus();
	}
}
