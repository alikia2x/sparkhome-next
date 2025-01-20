import { engineTranslation } from "lib/onesearch/translatedEngineList";
import i18next from "i18next";
import { SearchEngine } from "global";

export function getLocalizedSearchEngineName(engine: SearchEngine) {
	return getName(engine.name);
}

function getName(engineKey: string) {
	const t = i18next.t;
	return engineTranslation.includes(engineKey) ? t(`search.engine.${engineKey}`) : engineKey;
}
