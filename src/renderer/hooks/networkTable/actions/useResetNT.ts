import {ntGroupInfoRoot} from "../../ntGroupInfo/useNTGroupInfoRoot.ts";
import {atom, useSetAtom} from "jotai";

export const resetNTAtom = atom(null, (_, set) => {

    // TODO: Fix me
    // resetAtomFamily(ntValueHistoryAtomFamily);
    // resetAtomFamily(ntKeyFromPathAtomFamily);
    // resetAtomFamily(ntValueAtomFamily);
    // resetAtomFamily(ntGroupInfoAtomFamily);

    set(ntGroupInfoRoot, {
        name: "",
        path: "",
        children: []
    });
});

export default function useResetNT() {
    return useSetAtom(resetNTAtom);
}