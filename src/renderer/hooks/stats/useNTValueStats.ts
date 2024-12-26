import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {ntValueHistoryFromPathAtomFamily} from "../networkTable/useNTValueHistoryFromPath.ts";

export const ntValueStatsAtom = atomFamily((path: string) => atom((get) => {
    // Get value history
    const ntValueHistory = get(ntValueHistoryFromPathAtomFamily(path));
    if (ntValueHistory === undefined)
        return undefined;

    // Values could be anything, so we need to convert them to numbers
    const numericValues = ntValueHistory.values.map((value) => Number(value));

    // Calculate stats
    const sum = numericValues.reduce((a, b) => a + b, 0);
    const average = sum / numericValues.length;
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);

    return {
        sum,
        average,
        min,
        max,
    } as const;
}));

export default function useNTValueStats(path: string) {
    return useAtomValue(ntValueStatsAtom(path));
}