import {ntGroupInfoRoot} from "../../ntGroupInfo/useNTGroupInfoRoot.ts";
import {atom, useSetAtom} from "jotai";
import {ntValuesAtom} from "../useNTValues.ts";
import {ntValueHistoriesAtom} from "../useNTValueHistories.ts";
import {ntKeyFromPathsAtom} from "../useNTKeyFromPaths.ts";
import {logAtom} from "../../log/useLog.ts";

export const resetNTAtom = atom(null, (_, set) => {

    // Clear Log
    set(logAtom, "");

    // Clear History
    set(ntValueHistoriesAtom, {});

    // Clear NT
    set(ntValuesAtom, {});
    set(ntKeyFromPathsAtom, {});
    set(ntGroupInfoRoot, {
        name: "",
        path: "",
        children: []
    });
});

export default function useResetNT() {
    return useSetAtom(resetNTAtom);
}