import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {ntGroupInfoAtomFamily} from "../ntGroupInfo/useNTGroupInfo.ts";
import NTGroupInfo from "../../../types/nt/NTGroupInfo.ts";
import NTValue from "../../../types/nt/NTValue.ts";
import {ntValueFromPathAtomFamily} from "./useNTValueFromPath.ts";

// Atoms
export const ntValuesOfGroupAtomFamily = atomFamily((path: string) => atom((get) => {
    // Get Group
    const ntGroup = get(ntGroupInfoAtomFamily(path));
    if (ntGroup === undefined)
        return {};

    // Recursively Retrieve Values
    const values: Record<string, NTValue> = {};
    const getValues = (group: NTGroupInfo) => {

        // Get Values
        values[group.path] = get(ntValueFromPathAtomFamily(group.path));

        // Recursively Get Values
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