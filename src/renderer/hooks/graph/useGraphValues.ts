import {atom, useAtomValue} from "jotai";
import {selectedPathsAtom} from "../selectedPath/useSelectedPaths.ts";
import parseNetworkValueToNumber from "../../utils/parseNetworkValueToNumber.ts";
import {colorFromStringAtomFamily} from "../common/useColorFromString.ts";
import {ntGroupInfoAtomFamily} from "../ntGroupInfo/useNTGroupInfo.ts";
import {ntValueHistoryFromPathAtomFamily} from "../networkTable/useNTValueHistoryFromPath.ts";
import {ntValueStatsAtom} from "../stats/useNTValueStats.ts";

export const graphValuesAtom = atom((get) => {
    const selectedPaths = get(selectedPathsAtom);

    return selectedPaths.map((path) => {

        const valueHistory = get(ntValueHistoryFromPathAtomFamily(path));
        const values = valueHistory?.values.map((value, index) => ({
            value: parseNetworkValueToNumber(value),
            timestamp: valueHistory.timestamps[index],
        }));

        return {
            color: get(colorFromStringAtomFamily(path)),
            name: get(ntGroupInfoAtomFamily(path))?.name || path,
            path,
            value: parseNetworkValueToNumber(valueHistory?.latestValue),
            values,
            stats: get(ntValueStatsAtom(path)),
        };
    });
});

export default function useGraphValues() {
    return useAtomValue(graphValuesAtom);
}