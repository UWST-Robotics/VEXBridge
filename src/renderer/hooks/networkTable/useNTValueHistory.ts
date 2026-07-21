import {atomFamily} from "jotai/utils";
import {useAtomValue} from "jotai";
import {focusAtom} from "jotai-optics";
import {ntValueHistoriesAtom} from "./useNTValueHistories.ts";

// Atoms
export const ntValueHistoryAtomFamily = atomFamily((id: number) => focusAtom(ntValueHistoriesAtom, (optic) => optic.prop(id)));

// Hooks
export default function useNTValueHistory(id: number) {
    return useAtomValue(ntValueHistoryAtomFamily(id));
}