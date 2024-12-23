import {atom, useAtomValue} from "jotai";
import {selectedPathsAtom} from "../selectedPath/useSelectedPaths.ts";
import {valuesOverTimeAtom} from "./useValuesOverTime.ts";
import {pathStatsAtomFamily} from "./usePathStats.ts";
import {ntValueAtomFamily} from "../networkTable/useNTValue.ts";
import parseNetworkValueToNumber from "../../utils/parseNetworkValueToNumber.ts";
import {ntGroupInfoAtomFamily} from "../networkTable/useNTGroupInfo.ts";
import {colorFromStringAtomFamily} from "../common/useColorFromString.ts";

export const chartValuesAtom = atom((get) => {
    const selectedPaths = get(selectedPathsAtom);

    return selectedPaths.map((path) => ({
        color: get(colorFromStringAtomFamily(path)),
        name: get(ntGroupInfoAtomFamily(path))?.name || path,
        path,
        value: parseNetworkValueToNumber(get(ntValueAtomFamily(path))),
        values: get(valuesOverTimeAtom(path)),
        stats: get(pathStatsAtomFamily(path)),
    }));
});

export default function useChartValues() {
    return useAtomValue(chartValuesAtom);
}