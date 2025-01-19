import Background from "components/background";
import Time from "components/time";
import { useAtom, useSetAtom } from "jotai";
import Search from "components/search";
import { migrateToV3, settingsAtom } from "lib/state/settings";
import { bgFocusAtom } from "lib/state/background";
import EngineSelector from "components/engineSelector";
import OneSearch from "components/onesearch/onesearch";
import { useEffect, useState } from "react";
import { SettingsTypeV2 } from "../global";

export default function Homepage() {
	const [settings, setSettings] = useAtom(settingsAtom);
	const [prepared, setPrepared] = useState(false);
	const setBgFocus = useSetAtom(bgFocusAtom);

	useEffect(() => {
		if (settings.version == 2) {
			setSettings(migrateToV3(settings as unknown as SettingsTypeV2));
		}
		setPrepared(true);
	}, [settings, setSettings]);

	return (
		<div className="h-screen w-screen overflow-x-hidden bg-white dark:bg-[rgb(23,25,29)]">
			<title>sparkast</title>
			{prepared && (
				<>
					<Background />

					<EngineSelector />
					<Search onFocus={() => setBgFocus(true)} />
					<Time showSecond={settings.timeShowSecond} />
					<OneSearch />
				</>
			)}
		</div>
	);
}
