import {atom, useAtom} from "jotai";

// Atoms
export const maxTimeWindowAtom = atom(20000);

// Hooks
export default function useMaxTimeWindow() {
    return useAtom(maxTimeWindowAtom);
}