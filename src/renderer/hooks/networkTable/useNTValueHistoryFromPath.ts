import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {ntKeyFromPathAtomFamily} from "./useNTKeyFromPath.ts";
import {ntValueHistoryAtomFamily} from "./useNTValueHistory.ts";

// Atoms
export const ntValueHistoryFromPathAtomFamily = atomFamily((path: string) => atom((get) => {
    const key = get(ntKeyFromPathAtomFamily(path));
    if (key === undefined)
        return [];

    return get(ntValueHistoryAtomFamily(key));
}));

// Hooks
export default function useNTValueHistoryFromPath(path: string) {
    return useAtomValue(ntValueHistoryFromPathAtomFamily(path));
}