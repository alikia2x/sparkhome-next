import { settingsAtom } from "lib/state/settings";
import validUrl from "valid-url";
import validateColor from "validate-color";
import { useAtomValue } from "jotai";

export default function BackgroundContainer(props: {
	isFocus: boolean;
	src: string;
	darkMode: boolean;
	onClick: () => void;
}) {
	const settings = useAtomValue(settingsAtom);
	if (validateColor(props.src)) {
		return (
			<div
				className="w-full h-full fixed object-cover inset-0 duration-200 z-0"
				style={{ backgroundColor: props.src }}
				onClick={props.onClick}
			></div>
		);
	} else if (validUrl.isWebUri(props.src)) {
		return (
			<div className="w-screen h-screen absolute bg-black">
				<img
					src={props.src}
					className={
						"w-screen h-screen fixed object-cover inset-0 duration-200 z-0 " +
						(props.isFocus ? (settings.bgBlur ? "blur-lg scale-110" : "brightness-50 scale-105") : "")
					}
					alt="background"
					onClick={props.onClick}
				/>
			</div>
		);
	} else {
		if (props.darkMode) {
			return (
				<div
					className="w-full h-full fixed object-cover inset-0 duration-200 z-0 bg-[rgb(23,25,29)]"
					onClick={props.onClick}
				></div>
			);
		} else {
			return (
				<div
					className="w-full h-full fixed object-cover inset-0 duration-200 z-0 bg-white"
					onClick={props.onClick}
				></div>
			);
		}
	}
}
