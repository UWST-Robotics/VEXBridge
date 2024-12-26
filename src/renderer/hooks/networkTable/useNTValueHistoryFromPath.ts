import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {ntKeyFromPathAtomFamily} from "./useNTKeyFromPath.ts";
import {ntValueHistoryAtomFamily} from "./useNTValueHistory.ts";
import NTValueHistory from "../../../types/nt/NTValueHistory.ts";

// Atoms
export const ntValueHistoryFromPathAtomFamily = atomFamily((path: string) => atom<NTValueHistory | undefined>((get) => {
    const key = get(ntKeyFromPathAtomFamily(path));
    if (key === undefined)
        return undefined;

    return get(ntValueHistoryAtomFamily(key));
}));

// Hooks
export default function useNTValueHistoryFromPath(path: string) {
    return useAtomValue(ntValueHistoryFromPathAtomFamily(path));
}