import { SearchEngine } from "../global";

export default function (query: string, engine: SearchEngine, newTab: boolean = true) {
	if (newTab) window.open(engine.url.replace("%s", query));
	else window.location.href = engine.url.replace("%s", query);
}
