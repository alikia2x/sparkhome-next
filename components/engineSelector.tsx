import { settingsAtom } from "lib/state/settings";
import { useAtom, useAtomValue } from "jotai";
import { Select, SelectItem } from "@heroui/react";
import { getLocalizedSearchEngineName } from "../lib/onesearch/getSearchEngine.ts";
import { searchEngineAtom } from "../lib/state/searchEngine.ts";

export default function EngineSelector() {
	const [settings, setSettings] = useAtom(settingsAtom);
	const currentEngine = useAtomValue(searchEngineAtom);
	return (
		<div
			className="absolute top-20 lg:top-44 short:top-0 translate-x-[-50%] translate-y-[-0.2rem]  
            left-1/2 w-11/12 sm:w-[700px] text:black
            dark:text-white text-shadow-lg z-20 flex justify-end"
		>
			<Select
				className="z-30 w-36"
				items={settings.searchEngines}
				selectedKeys={[currentEngine.id]}
				selectionMode="single"
				onSelectionChange={(id) => {
					setSettings((prev) => {
						return {
							...prev,
							currentSearchEngine: id.currentKey!
						};
					});
				}}
				selectorIcon={<></>}
			>
				{(engine) => (
					<SelectItem className="w-36" key={engine.id} title={getLocalizedSearchEngineName(engine)} />
				)}
			</Select>
		</div>
	);
}
