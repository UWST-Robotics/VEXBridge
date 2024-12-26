import {atom, useSetAtom} from "jotai";
import fetchAPIEndpoint from "../../utils/fetchAPIEndpoint.ts";
import {serialStateAtom} from "../serialPorts/useSerialState.ts";
import {serialListAtom} from "../serialPorts/useSerialList.ts";
import NTValueHistory from "../../../types/nt/NTValueHistory.ts";
import {resetNTAtom} from "../networkTable/actions/useResetNT.ts";
import {initStateAtom} from "./useInitState.ts";
import InitState from "../../../types/InitState.ts";
import {setNTKeyFromPathAtom} from "../networkTable/actions/useSetNTKeyFromPath.ts";
import {ntValueHistoryAtomFamily} from "../networkTable/useNTValueHistory.ts";
import {logAtom} from "../log/useLog.ts";

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

        // Get Value History from DB
        const valueKeys = await fetchAPIEndpoint<number[]>("/values");
        for (const valueKey of valueKeys) {
            const valueHistory = await fetchAPIEndpoint<NTValueHistory>(`/values/${valueKey}`);

            // Update Network Table
            set(ntValueHistoryAtomFamily(valueHistory.key), valueHistory);
            if (valueHistory.path)
                set(setNTKeyFromPathAtom, valueHistory.path, valueHistory.key);
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