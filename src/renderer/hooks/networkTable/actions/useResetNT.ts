import resetAtomFamily from "../../../utils/resetAtomFamily.ts";
import {ntValueHistoryAtomFamily} from "../useNTValueHistory.ts";
import {ntGroupInfoRoot} from "../../ntGroupInfo/useNTGroupInfoRoot.ts";
import {atom, useSetAtom} from "jotai";
import {ntKeyFromPathAtomFamily} from "../useNTKeyFromPath.ts";

export const resetNTAtom = atom(null, (_, set) => {
    resetAtomFamily(ntValueHistoryAtomFamily);
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