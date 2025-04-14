import {atom, useSetAtom} from "jotai";
import fetchAPIEndpoint from "../../utils/fetchAPIEndpoint.ts";
import {serialStateAtom} from "../serialPorts/useSerialState.ts";
import {serialListAtom} from "../serialPorts/useSerialList.ts";
import {resetNTAtom} from "../networkTable/actions/useResetNT.ts";
import {initStateAtom} from "./useInitState.ts";
import InitState from "../../../types/InitState.ts";
import {setNTKeyFromPathAtom} from "../networkTable/actions/useSetNTKeyFromPath.ts";
import {ntValueAtomFamily} from "../networkTable/useNTValue.ts";
import {logAtom} from "../log/useLog.ts";
import NTValueInfo from "../../../types/nt/NTValueInfo.ts";

// Atoms
export const fetchInitialStateAtom = atom(null, async (_, set) => {
    try {
        // Reset Network Table
        set(initStateAtom, InitState.LOADING);
        set(resetNTAtom);

        // Fetch Initial State
        set(serialStateAtom, await fetchAPIEndpoint("serial"));
        set(serialListAtom, await fetchAPIEndpoint("serial/list"));
        set(logAtom, await fetchAPIEndpoint("log"));

        // Get Value from DB
        const valueDB = await fetchAPIEndpoint<NTValueInfo[]>("values");
        for (const value of valueDB) {
            set(setNTKeyFromPathAtom, value.label, value.key);
            set(ntValueAtomFamily(value.key), value.value);
        }

        // Set the state to loaded
        set(initStateAtom, InitState.DONE);
    } catch (e) {
        console.error(e);
        set(initStateAtom, InitState.ERROR);
    }
});

// Hooks
export default function useFetchInitialState() {
    return useSetAtom(fetchInitialStateAtom);
}