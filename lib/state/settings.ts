import { SettingsType, SettingsTypeV2 } from "global";
import { atomWithStorage } from "jotai/utils";

const defaultSettings: SettingsType = {
	version: 3,
	elementBackdrop: true,
	bgBlur: true,
	timeShowSecond: false,
	currentSearchEngine: "google",
	searchInNewTab: true,
	searchEngines: [
		{
			name: "google",
			url: "https://www.google.com/search?q=%s",
			hidden: false
		},
		{
			name: "bing",
			url: "https://www.bing.com/search?q=%s",
			hidden: false
		},
		{
			name: "baidu",
			url: "https://www.baidu.com/s?wd=%s",
			hidden: false
		},
		{
			name: "duckduckgo",
			url: "https://duckduckgo.com/?q=%s",
			hidden: false
		},
		{
			name: "yandex",
			url: "https://yandex.com/search/?text=%s",
			hidden: false
		},
		{
			name: "yahoo",
			url: "https://search.yahoo.com/search?p=%s",
			hidden: false
		},
		{
			name: "ecosia",
			url: "https://www.ecosia.org/search?q=%s",
			hidden: false
		}
	]
};

export const migrateToV3 = (settings: SettingsTypeV2) => {
	return {
		...settings,
		version: 3,
		searchEngines: Object.keys(settings.searchEngines).map((key) => {
			return {
				name: key,
				url: settings.searchEngines[key],
				hidden: false
			};
		})
	};
};

const settingsAtom = atomWithStorage("settings", defaultSettings);

export { settingsAtom };
