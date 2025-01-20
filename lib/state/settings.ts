import { SettingsType, SettingsTypeV2 } from "global";
import { atomWithStorage } from "jotai/utils";

const defaultSettings: SettingsType = {
	version: 3,
	elementBackdrop: true,
	bgBlur: true,
	timeShowSecond: false,
	currentSearchEngine: "f99eb15f-d37c-4c57-b99c-7173b14e0804",
	searchInNewTab: true,
	searchEngines: [
		{
			id: "f99eb15f-d37c-4c57-b99c-7173b14e0804",
			name: "google",
			url: "https://www.google.com/search?q=%s",
			hidden: false
		},
		{
			id: "b5dd964d-36e3-4102-b521-a5aa771811e5",
			name: "bing",
			url: "https://www.bing.com/search?q=%s",
			hidden: false
		},
		{
			id: "f07c0813-8328-43b5-9673-93d21164ab82",
			name: "baidu",
			url: "https://www.baidu.com/s?wd=%s",
			hidden: false
		},
		{
			id: "128f415e-a147-4920-9b8c-09d6c1158321",
			name: "duckduckgo",
			url: "https://duckduckgo.com/?q=%s",
			hidden: false
		},
		{
			id: "f47d9736-521c-4181-9fa2-74ce5a59343c",
			name: "yandex",
			url: "https://yandex.com/search/?text=%s",
			hidden: false
		},
		{
			id: "eca9ce8d-209e-4c25-aedd-06f6896ad651",
			name: "yahoo",
			url: "https://search.yahoo.com/search?p=%s",
			hidden: false
		},
		{
			id: "1b6dd6a6-06e5-474d-8c13-ddc369d8b4c9",
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
				id: crypto.randomUUID(),
				name: key,
				url: settings.searchEngines[key],
				hidden: false
			};
		})
	};
};

const settingsAtom = atomWithStorage("settings", defaultSettings);

export { settingsAtom };
