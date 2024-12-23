import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {selectedPathsAtom} from "./useSelectedPaths.ts";

// Atoms
export const isPathSelectedAtomFamily = atomFamily((path: string) => atom((get) => {
    const selectedPaths = get(selectedPathsAtom);
    return selectedPaths.includes(path);
}));

// Hooks
export default function useIsPathSelected(path: string) {
    return useAtomValue(isPathSelectedAtomFamily(path));
}
