import {atom, useSetAtom} from "jotai";
import NTValue from "../../../../types/nt/NTValue.ts";
import {ntValueAtomFamily} from "../useNTValue.ts";
import {ntValueHistoryAtomFamily} from "../useNTValueHistory.ts";

const MAX_VALUE_MEMORY = 10000;

export const updateNTValueAtom = atom(null, (_, set, key: number, value: NTValue, timestamp: number) => {
    set(ntValueHistoryAtomFamily(key), (prev) => {
        const next = [...prev, {
            value,
            timestamp
        }];

        if (next.length > MAX_VALUE_MEMORY)
            next.shift();

        return next;
    });

    set(ntValueAtomFamily(key), value);
});

export default function useUpdateNTValue() {
    return useSetAtom(updateNTValueAtom);
}