import { settingsAtom } from "lib/state/settings";
import { useAtom, useAtomValue } from "jotai";
import { getLocalizedSearchEngineName } from "lib/onesearch/getSearchEngine.ts";
import { searchEngineAtom } from "lib/state/searchEngine.ts";
import { createListCollection } from "@chakra-ui/react";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from "components/ui/select";

export default function EngineSelector() {
	const [settings, setSettings] = useAtom(settingsAtom);
	const currentEngine = useAtomValue(searchEngineAtom);
	const engines = createListCollection({
		items: settings.searchEngines
	});

	return (
		<div
			className="absolute top-20 lg:top-44 short:top-0 translate-x-[-50%] translate-y-[-0.2rem]
            left-1/2 w-11/12 sm:w-[700px] text:black
            dark:text-white text-shadow-lg z-20 flex justify-end"
		>
			<SelectRoot
				collection={engines}
				value={[currentEngine.id]}
				className="w-32  bg-zinc-200 dark:bg-zinc-800   rounded-lg"
				onValueChange={(details) => {
					console.log(details.value[0]);
					setSettings((prev) => {
						return {
							...prev,
							currentSearchEngine: details.value[0]
						};
					});
				}}
			>
				<SelectTrigger showIndicator={false} className="w-full overflow-hidden ">
					<span className="w-full text-center">{getLocalizedSearchEngineName(currentEngine)}</span>
				</SelectTrigger>
				<SelectContent className="w-32">
					{settings.searchEngines.map((engine) => (
						<SelectItem item={engine.id} key={engine.id}>
							{getLocalizedSearchEngineName(engine)}
						</SelectItem>
					))}
				</SelectContent>
			</SelectRoot>
		</div>
	);
}
