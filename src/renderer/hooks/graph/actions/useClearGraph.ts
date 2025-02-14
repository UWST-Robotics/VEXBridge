import {atom, useSetAtom} from "jotai";
import resetAtomFamily from "../../../utils/resetAtomFamily.ts";
import {ntValueHistoryAtomFamily} from "../../networkTable/useNTValueHistory.ts";

// Atoms
export const clearGraphAtom = atom(null, () => {
    resetAtomFamily(ntValueHistoryAtomFamily);
});

// Hooks
export default function useClearGraph() {
    return useSetAtom(clearGraphAtom);
}