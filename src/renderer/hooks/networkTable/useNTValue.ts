import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import NTValue from "../../../types/nt/NTValue.ts";

// Atoms
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ntValueAtomFamily = atomFamily((_: number) => atom<NTValue>(undefined));

// Hooks
export default function useNTValue(id: number) {
    return useAtomValue(ntValueAtomFamily(id));
}