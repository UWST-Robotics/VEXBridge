import {atom, useSetAtom} from "jotai";
import NTValue from "../../../../types/nt/NTValue.ts";
import {ntValueHistoryAtomFamily} from "../useNTValueHistory.ts";

export const updateNTValueAtom = atom(null, (get, set, key: number, value: NTValue, timestamp: number) => {

    // Get the value history
    let ntValueHistory = get(ntValueHistoryAtomFamily(key));

    // If the value history doesn't exist, create it
    if (!ntValueHistory)
        ntValueHistory = {
            key,
            values: [],
            timestamps: [],
            latestValue: value
        };

    // Update the atom
    set(ntValueHistoryAtomFamily(key), {
        ...ntValueHistory,
        values: [...ntValueHistory.values, value],
        timestamps: [...ntValueHistory.timestamps, timestamp],
        latestValue: value
    });
});

export default function useUpdateNTValue() {
    return useSetAtom(updateNTValueAtom);
}