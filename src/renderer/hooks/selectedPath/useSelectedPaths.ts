import {atom, useAtomValue} from "jotai";

// Atoms
export const selectedPathsAtom = atom<string[]>([]);

// Hooks
export default function useSelectedPaths() {
    return useAtomValue(selectedPathsAtom);
}