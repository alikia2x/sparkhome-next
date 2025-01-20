import { normalizeURL } from "lib/normalizeURL";
import { useNavigate } from "react-router";

interface LinkSuggestionProps {
	children: React.ReactNode;
	query: string;
	selected: boolean;
	inPage?: boolean;
}

export default function LinkSuggestion(props: LinkSuggestionProps) {
	const navigate = useNavigate();
	return (
		<div
			className={`w-full h-10 leading-10 px-5 z-10 duration-100 bg-opacity-40 hover:bg-opacity-50 
			${
				props.selected
					? "bg-zinc-300 dark:bg-zinc-700"
					: "bg-zinc-100 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-700"
			}`}
			onClick={() => {
				if (props.inPage) {
					navigate(props.query);
				} else {
					window.open(normalizeURL(props.query));
				}
			}}
		>
			{props.children}
		</div>
	);
}
