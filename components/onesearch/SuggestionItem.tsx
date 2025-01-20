import { SuggestionItem } from "global";
import PlainSearch from "./plainSearch";
import LinkSuggestion from "./link";
import PlainText from "./plainText";

export default function SuggestionComponent({
	s,
	i,
	selected,
	devMode,
	engineName,
	t
}: {
	s: SuggestionItem;
	i: number;
	selected: number;
	devMode: boolean;
	engineName: string;
	t: any;
}) {
	if (s.suggestion.trim() === "") return null;

	if (s.type === "default") {
		return (
			<PlainSearch key={i} query={s.suggestion} selected={i == selected}>
				{s.suggestion}&nbsp;
				<span className="text-zinc-700 dark:text-zinc-400 text-sm">
					{t("search.search-help-text", { engine: engineName })}
				</span>
				{devMode && (
					<span className="absolute text-zinc-700 dark:text-zinc-400 text-sm leading-10 h-10 right-2">
						{s.relevance}
					</span>
				)}
			</PlainSearch>
		);
	} else if (s.type === "QUERY") {
		return (
			<PlainSearch key={i} query={s.suggestion} selected={i == selected}>
				{s.suggestion}
				{devMode && (
					<span className="absolute text-zinc-700 dark:text-zinc-400 text-sm leading-10 h-10 right-2">
						{s.relevance}
					</span>
				)}
			</PlainSearch>
		);
	} else if (s.type === "NAVIGATION" || s.type === "default-link" || s.type === "link") {
		return (
			<LinkSuggestion key={i} query={s.suggestion} selected={i == selected}>
				{s.prompt && <span className="text-zinc-700 dark:text-zinc-400">{s.prompt}</span>}
				{s.suggestion}
				{devMode && (
					<span className="absolute text-zinc-700 dark:text-zinc-400 text-sm leading-10 h-10 right-2">
						{s.relevance}
					</span>
				)}
			</LinkSuggestion>
		);
	} else if (s.type === "text") {
		return (
			<PlainText key={i} selected={i == selected}>
				{s.prompt && <span className="text-zinc-700 dark:text-zinc-400">{s.prompt}</span>}
				<p>{s.suggestion}</p>
				{devMode && (
					<span className="bottom-0 absolute text-zinc-700 dark:text-zinc-400 text-sm leading-10 h-10 right-2">
						{s.relevance}
					</span>
				)}
			</PlainText>
		);
	} else if (s.type === "inpage-link") {
		return (
			<LinkSuggestion key={i} query={s.suggestion} selected={i == selected} inPage={true}>
				{s.prompt && <span className="text-zinc-700 dark:text-zinc-400">{s.prompt}</span>}
				{s.suggestion}
				{devMode && (
					<span className="absolute text-zinc-700 dark:text-zinc-400 text-sm leading-10 h-10 right-2">
						{s.relevance}
					</span>
				)}
			</LinkSuggestion>
		);
	}

	return null;
}
