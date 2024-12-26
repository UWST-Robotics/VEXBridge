import {atom, useSetAtom} from "jotai";
import {selectedPathsAtom} from "../useSelectedPaths.ts";

// Atoms
export const selectPathAtom = atom(null, (get, set, path: string) => {
    const selectedPaths = get(selectedPathsAtom);

    // Append the path to the selected paths if it is not already selected
    if (!selectedPaths.includes(path))
        set(selectedPathsAtom, [...selectedPaths, path]);
    else
        set(selectedPathsAtom, selectedPaths.filter((selectedPath) => selectedPath !== path));
});

// Functions
export default function useSelectPath() {
    return useSetAtom(selectPathAtom);
}