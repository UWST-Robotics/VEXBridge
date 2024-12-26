import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import NTTimestampedValue from "../../../types/nt/NTTimestampedValue.ts";

// Atoms
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ntValueHistoryAtomFamily = atomFamily((_: number) => atom<NTTimestampedValue[]>([]));

// Hooks
export default function useNTValueHistory(id: number) {
    return useAtomValue(ntValueHistoryAtomFamily(id));
}