import resetAtomFamily from "../../../utils/resetAtomFamily.ts";
import {ntValueAtomFamily} from "../useNTValue.ts";
import {ntGroupInfoRoot} from "../../ntGroupInfo/useNTGroupInfoRoot.ts";
import {atom, useSetAtom} from "jotai";
import {ntKeyFromPathAtomFamily} from "../useNTKeyFromPath.ts";

export const resetNTAtom = atom(null, (_, set) => {
    resetAtomFamily(ntValueAtomFamily);
    resetAtomFamily(ntKeyFromPathAtomFamily);

    set(ntGroupInfoRoot, {
        name: "",
        path: "",
        children: []
    });
});

export default function useResetNT() {
    return useSetAtom(resetNTAtom);
}