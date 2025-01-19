import { SuggestionItem } from "global";
import { atom } from "jotai";

const suggestionAtom = atom([] as SuggestionItem[]);

export { suggestionAtom };
