import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {ntValueHistoryAtomFamily} from "../networkTable/useNTValueHistory.ts";
import {ntKeyFromPathAtomFamily} from "../networkTable/useNTKeyFromPath.ts";

export const ntValueStatsAtom = atomFamily((path: string) => atom((get) => {
    // Get key from path
    const key = get(ntKeyFromPathAtomFamily(path));
    if (key === undefined)
        return undefined;

    // Get value history
    const ntValueHistory = get(ntValueHistoryAtomFamily(key));
    if (ntValueHistory === undefined)
        return undefined;

    // Values could be anything, so we need to convert them to numbers
    // and filter out any that are not numbers
    const numericValues = ntValueHistory
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