import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";

// Atoms
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ntKeyFromPathAtomFamily = atomFamily((_: string) => atom<number | undefined>(undefined));

// Hooks
export default function useNTKeyFromPath(path: string) {
    return useAtomValue(ntKeyFromPathAtomFamily(path));
}