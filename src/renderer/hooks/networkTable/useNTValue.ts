import {atomFamily} from "jotai/utils";
import {useAtomValue} from "jotai";
import {focusAtom} from "jotai-optics";
import {ntValuesAtom} from "./useNTValues.ts";

// Atoms
export const ntValueAtomFamily = atomFamily((id: number) => focusAtom(ntValuesAtom, (optic) => optic.prop(id)));

// Hooks
export default function useNTValue(id: number) {
    return useAtomValue(ntValueAtomFamily(id));
}