import {atom, useAtomValue} from "jotai";

// Atoms
export const logAtom = atom("");

// Hooks
export default function useLog() {
    return useAtomValue(logAtom);
}