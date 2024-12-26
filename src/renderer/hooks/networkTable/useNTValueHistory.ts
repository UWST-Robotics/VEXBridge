import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import NTValueHistory from "../../../types/nt/NTValueHistory.ts";

// Atoms
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ntValueHistoryAtomFamily = atomFamily((_: number) => atom<NTValueHistory | undefined>(undefined));

// Hooks
export default function useNTValueHistory(id: number) {
    return useAtomValue(ntValueHistoryAtomFamily(id));
}