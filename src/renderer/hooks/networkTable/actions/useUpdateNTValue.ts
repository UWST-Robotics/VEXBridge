import {atom, useSetAtom} from "jotai";
import NTValue from "../../../../types/nt/NTValue.ts";
import {ntValueAtomFamily} from "../useNTValue.ts";
import {ntValueHistoryAtomFamily} from "../useNTValueHistory.ts";

const MAX_VALUE_MEMORY = 2000;

export const updateNTValueAtom = atom(null, (_, set, key: number, value: NTValue) => {

    set(ntValueHistoryAtomFamily(key), (prev) => {
        return [...prev, {
            value,
            timestamp: Date.now()
        }].slice(-MAX_VALUE_MEMORY);
    });

    set(ntValueAtomFamily(key), value);
});

export default function useUpdateNTValue() {
    return useSetAtom(updateNTValueAtom);
}