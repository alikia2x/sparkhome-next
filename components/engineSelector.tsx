import { useTranslation } from "react-i18next";
import { settingsAtom } from "lib/state/settings";
import { engineTranslation } from "lib/onesearch/translatedEngineList";
import { SettingsType } from "global";
import { useAtomValue } from "jotai";

import {Select, SelectItem} from "@heroui/react";


export default function EngineSelector() {
	const { t } = useTranslation();
	const settings: SettingsType = useAtomValue(settingsAtom);

	function getName(engineKey: string) {
		return engineTranslation.includes(engineKey) ? t(`search.engine.${engineKey}`) : engineKey;
	}

	return (
		<Select
			className="max-w-xs"
			items={settings.searchEngines}
			label="Assigned to"
			labelPlacement="outside"
			placeholder="Select a user"
		>
			{(engine) => (
				<SelectItem key={engine.url} textValue={engine.name}>
					<span>{getName(engine.name)}</span>
				</SelectItem>
			)}
		</Select>
	);
}


