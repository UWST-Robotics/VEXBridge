import {atom, useSetAtom} from "jotai";
import {selectedPathsAtom} from "../useSelectedPaths.ts";

// Atoms
export const deselectPathAtom = atom(null, (get, set, path: string) => {
    const selectedPaths = get(selectedPathsAtom);
    set(selectedPathsAtom, selectedPaths.filter((selectedPath) => selectedPath !== path));
});

// Hooks
export default function useDeselectPath() {
    return useSetAtom(deselectPathAtom);
}