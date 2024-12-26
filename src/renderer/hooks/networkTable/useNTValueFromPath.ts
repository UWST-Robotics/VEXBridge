import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import NTValue from "../../../types/nt/NTValue.ts";
import {ntValueHistoryFromPathAtomFamily} from "./useNTValueHistoryFromPath.ts";

// Atoms
export const ntValueFromPathAtomFamily = atomFamily((path: string) => atom<NTValue>((get) => {
    const valueHistory = get(ntValueHistoryFromPathAtomFamily(path));
    return valueHistory?.latestValue;
}));

// Hooks
export default function useNTValueFromPath(path: string) {
    return useAtomValue(ntValueFromPathAtomFamily(path));
}