import {atomFamily} from "jotai/utils";
import {useAtomValue} from "jotai";
import {focusAtom} from "jotai-optics";
import {ntKeyFromPathsAtom} from "./useNTKeyFromPaths.ts";

// Atoms
export const ntKeyFromPathAtomFamily = atomFamily((path: string) => focusAtom(ntKeyFromPathsAtom, (optic) => optic.prop(path)));

// Hooks
export default function useNTKeyFromPath(path: string) {
    return useAtomValue(ntKeyFromPathAtomFamily(path));
}