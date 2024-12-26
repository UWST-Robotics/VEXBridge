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
import NTValue from "../../../types/nt/NTValue.ts";

// Atoms
export const fetchInitialStateAtom = atom(null, async (_, set) => {
    try {
        // Reset Network Table
        set(initStateAtom, InitState.LOADING);
        set(resetNTAtom);

        // Fetch Initial State
        set(serialStateAtom, await fetchAPIEndpoint("/serial"));
        set(serialListAtom, await fetchAPIEndpoint("/serial/list"));
        set(logAtom, await fetchAPIEndpoint("/log"));

        // Get Paths from DB
        const pathDB = await fetchAPIEndpoint<Record<number, string>>("/paths");
        for (const key in pathDB) {
            const path = pathDB[key];
            set(setNTKeyFromPathAtom, path, parseInt(key));
        }

        // Get Value History from DB
        const valueDB = await fetchAPIEndpoint<Record<number, NTValue>>("/values");
        for (const key in valueDB) {
            const value = valueDB[key];
            set(ntValueAtomFamily(parseInt(key)), value);
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