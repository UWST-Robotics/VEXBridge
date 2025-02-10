import {atom, useAtomValue} from "jotai";
import {selectedPathsAtom} from "../selectedPath/useSelectedPaths.ts";
import parseNetworkValueToNumber from "../../utils/parseNetworkValueToNumber.ts";
import {colorFromStringAtomFamily} from "../common/useColorFromString.ts";
import {ntGroupInfoAtomFamily} from "../ntGroupInfo/useNTGroupInfo.ts";
import {ntValueStatsAtom} from "../stats/useNTValueStats.ts";
import {ntValueHistoryAtomFamily} from "../networkTable/useNTValueHistory.ts";
import {ntKeyFromPathAtomFamily} from "../networkTable/useNTKeyFromPath.ts";
import {ntValueAtomFamily} from "../networkTable/useNTValue.ts";

export const graphValuesAtom = atom((get) => {
    const selectedPaths = get(selectedPathsAtom);

    return selectedPaths.map((path) => {
        const key = get(ntKeyFromPathAtomFamily(path)) ?? -1;

        return {
            color: get(colorFromStringAtomFamily(path)),
            name: get(ntGroupInfoAtomFamily(path))?.name || path,
            path,
            value: parseNetworkValueToNumber(get(ntValueAtomFamily(key))),
            values: get(ntValueHistoryAtomFamily(key)),
            stats: get(ntValueStatsAtom(path)),
        };
    });
});

export default function useGraphValues() {
    return useAtomValue(graphValuesAtom);
}