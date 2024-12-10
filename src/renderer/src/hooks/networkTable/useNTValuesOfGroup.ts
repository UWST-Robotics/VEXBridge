import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {ntGroupInfoAtomFamily} from "./useNTGroupInfo.ts";
import NTValue from "../../types/nt/NTValue.ts";
import {ntValueAtomFamily} from "./useNTValue.ts";
import NTGroupInfo from "../../types/nt/NTGroupInfo.ts";

// Atoms
export const ntValuesOfGroupAtomFamily = atomFamily((path: string) => atom((get) => {
    // Get Group
    const ntGroup = get(ntGroupInfoAtomFamily(path));
    if (ntGroup === undefined)
        return {};

    // Recursively Retrieve Values
    const values: Record<string, NTValue> = {};
    const getValues = (group: NTGroupInfo) => {
        values[group.path] = get(ntValueAtomFamily(group.path));
        for (const child of group.children)
            getValues(child);
    };
    getValues(ntGroup);

    return values;
}));

// Hooks
export default function useNTValuesOfGroup(path: string) {
    return useAtomValue(ntValuesOfGroupAtomFamily(path));
}