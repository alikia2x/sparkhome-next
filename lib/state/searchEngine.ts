import { derive } from "jotai-derive";
import { settingsAtom } from "./settings.ts";
import { fallbackSearchEngine } from "../onesearch/consts.ts";

export const searchEngineAtom = derive(
	[settingsAtom], // Dependencies: settingsAtom will be awaited only when necessary
	(settings) => {
		// Find the search engine that matches the current search engine ID
		const currentSearchEngine = settings.searchEngines.find((engine) => engine.id === settings.currentSearchEngine);

		// Return the found search engine or a fallback if none is found
		return currentSearchEngine || fallbackSearchEngine;
	}
);
