import {atom, useAtomValue} from "jotai";

// Atoms
export const logAtom = atom("\x1b[90m --- start of log --- \x1b[0m\n");

// Hooks
export default function useLog() {
    return useAtomValue(logAtom);
}