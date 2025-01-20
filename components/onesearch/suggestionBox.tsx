import { useAtom, useAtomValue } from "jotai";
import { bgFocusAtom } from "lib/state/background";
import { settingsAtom } from "lib/state/settings";

export default function SuggestionBox(props: {
	children?: React.ReactNode;
	style?: "default" | "image";
}) {
	const style = props.style || "default";
	const focus = useAtomValue(bgFocusAtom);
	const settings = useAtomValue(settingsAtom);

	if (style == "image") {
		return (
			<div
				className={`relative w-11/12 sm:w-[700px]  
				overflow-y-auto left-1/2 translate-x-[-50%] top-72 z-20 rounded-md overflow-hidden duration-250 
				dark:text-white ${settings.bgBlur ? 
					"backdrop-blur-sm bg-white/40 dark:bg-black/40" : 
					"bg-white dark:bg-zinc-800"
				}
				${props.children ? "opacity-100" : "opacity-0"} 
				${focus ? "h-fit max-h-[calc(100vh-20rem)]" : "h-0"} `}
			>
				{props.children}
			</div>
		);
	} else {
		return (
			<div
				className={`relative bg-zinc-100 dark:bg-zinc-800 w-11/12 sm:w-[700px] h-auto max-h-[calc(100vh-20rem)] 
        overflow-y-auto left-1/2 translate-x-[-50%] top-72 z-20 rounded-md overflow-hidden duration-250 dark:text-white 
        ${props.children ? "opacity-100" : "opacity-0"}`}
			>
				{props.children}
			</div>
		);
	}
}
