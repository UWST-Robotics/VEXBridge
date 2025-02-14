import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {ntValueHistoryAtomFamily} from "../networkTable/useNTValueHistory.ts";
import {ntKeyFromPathAtomFamily} from "../networkTable/useNTKeyFromPath.ts";
import {maxTimeWindowAtom} from "../graph/useMaxTimeWindow.ts";

export const ntValueStatsAtom = atomFamily((path: string) => atom((get) => {
    // Get key from path
    const key = get(ntKeyFromPathAtomFamily(path));
    if (key === undefined)
        return undefined;

    // Get value history
    const ntValueHistory = get(ntValueHistoryAtomFamily(key));
    if (ntValueHistory === undefined)
        return undefined;

    // Get Time Window
    const maxTimeWindow = get(maxTimeWindowAtom);
    const oldestTime = Date.now() - maxTimeWindow;

    // Filter values by time window
    // Then convert to numbers
    // Then filter out any that are NaN
    const numericValues = ntValueHistory
        .filter((v) => v.timestamp >= oldestTime)
        .map((v) => Number(v.value))
        .filter((v) => !isNaN(v));

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