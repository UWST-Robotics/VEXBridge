import {atom, useSetAtom} from "jotai";
import {ntGroupInfoAtomFamily} from "../../ntGroupInfo/useNTGroupInfo.ts";
import {childNameAtomFamily} from "../../ntGroupInfo/utils/useChildName.ts";
import {ntKeyFromPathAtomFamily} from "../useNTKeyFromPath.ts";

// Atoms
export const setNTKeyFromPathAtom = atom(null, (get, set, path: string, key: number) => {

    // Update Key from Path
    set(ntKeyFromPathAtomFamily(path), key);

    // Check if the group info exists
    const groupInfoAtom = ntGroupInfoAtomFamily(path);
    const groupInfo = get(groupInfoAtom);
    if (groupInfo === undefined)
        set(groupInfoAtom, {
            name: get(childNameAtomFamily(path)),
            path,
            children: []
        });
});

// Hooks
export default function useSetNTKeyFromPath() {
    return useSetAtom(setNTKeyFromPathAtom);
}