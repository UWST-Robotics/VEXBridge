import {atom, useSetAtom} from "jotai";
import NTValue from "../../../../types/nt/NTValue.ts";
import {ntValueAtomFamily} from "../useNTValue.ts";
import {ntValueHistoryAtomFamily} from "../useNTValueHistory.ts";

const MAX_VALUE_MEMORY = 2000;

export const updateNTValueAtom = atom(null, (_, set, key: number, value: NTValue) => {

    // Add to Value History
    set(ntValueHistoryAtomFamily(key), (prev) => {
        const next = [
            ...(prev || []),
            {value, timestamp: Date.now()}
        ];

        if (next.length > MAX_VALUE_MEMORY)
            next.shift();
        console.log(next.length);

        return next;
    });

    set(ntValueAtomFamily(key), value);
});

export default function useUpdateNTValue() {
    return useSetAtom(updateNTValueAtom);
}