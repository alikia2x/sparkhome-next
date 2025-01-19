import React from "react";

interface settingsType extends object {
	version: number;
	elementBackdrop: boolean;
	bgBlur: boolean;
	timeShowSecond: boolean;
	currentSearchEngine: string;
	searchInNewTab: boolean;
	searchEngines: {
		[key: string]: string;
	};
}

interface SuggestionsResponse extends object {
	suggestions: Suggestion[];
	query: string;
	verbatimRelevance: number;
	time: number;
}

interface SuggestionItem {
	suggestion: string;
	type: string;
	relativeRelevance?: number;
	relevance: number;
	prompt?: string | React.ReactElement;
	intention?: string | null;
	probability?: number;
	confidence?: number;
};
