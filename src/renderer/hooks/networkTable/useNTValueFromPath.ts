import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {ntKeyFromPathAtomFamily} from "./useNTKeyFromPath.ts";
import NTValue from "../../../types/nt/NTValue.ts";
import {ntValueAtomFamily} from "./useNTValue.ts";

// Atoms
export const ntValueFromPathAtomFamily = atomFamily((path: string) => atom<NTValue>((get) => {
    const key = get(ntKeyFromPathAtomFamily(path));
    if (key === undefined)
        return undefined;

    return get(ntValueAtomFamily(key));
}));

// Hooks
export default function useNTValueFromPath(path: string) {
    return useAtomValue(ntValueFromPathAtomFamily(path));
}