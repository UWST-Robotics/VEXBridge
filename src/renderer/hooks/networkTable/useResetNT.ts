import resetAtomFamily from "../../utils/resetAtomFamily.ts";
import {ntValueAtomFamily} from "./useNTValue.ts";
import {ntGroupInfoRoot} from "./useNTGroupInfoRoot.ts";
import {atom, useSetAtom} from "jotai";

export const resetNTAtom = atom(null, (_, set) => {
    resetAtomFamily(ntValueAtomFamily);
    set(ntGroupInfoRoot, {
        name: "",
        path: "",
        children: []
    });
});

export default function useResetNT() {
    return useSetAtom(resetNTAtom);
}