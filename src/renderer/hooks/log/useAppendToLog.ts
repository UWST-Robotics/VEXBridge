import {atom} from "jotai";
import {logAtom} from "./useLog.ts";

// Atoms
export const appendToLogAtom = atom(null, (get, set, message: string) => {
    set(logAtom, get(logAtom) + message);
});

// Hooks
export default function useAppendToLog() {
    return appendToLogAtom;
}