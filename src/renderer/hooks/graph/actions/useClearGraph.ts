import {atom, useSetAtom} from "jotai";
import {ntValueHistoriesAtom} from "../../networkTable/useNTValueHistories.ts";

// Atoms
export const clearGraphAtom = atom(null, (_, set) => {
    set(ntValueHistoriesAtom, {});
});

// Hooks
export default function useClearGraph() {
    return useSetAtom(clearGraphAtom);
}