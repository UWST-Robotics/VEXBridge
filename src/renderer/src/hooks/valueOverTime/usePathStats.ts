import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {valuesOverTimeAtom} from "./useValuesOverTime.ts";

// Atoms
export const pathStatsAtomFamily = atomFamily((path: string) => atom((get) => {
    // Get the values over time
    const valuesOverTime = get(valuesOverTimeAtom(path));

    // Calculate the min, max, and average
    const values = valuesOverTime.map((value) => value.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const average = values.reduce((a, b) => a + b, 0) / values.length;

    return {
        min,
        max,
        average,
    };
}));

// Hooks
export default function usePathStats(path: string) {
    return useAtomValue(pathStatsAtomFamily(path));
}