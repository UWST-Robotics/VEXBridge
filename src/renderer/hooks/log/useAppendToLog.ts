import {atom} from "jotai";
import {logAtom} from "./useLog.ts";

const MAX_LOG_MEMORY = 10000; // 10000 characters

// Atoms
export const appendToLogAtom = atom(null, (get, set, message: string) => {

    // Append the message to the log
    let logText = get(logAtom) + message;

    // Truncate the log if it exceeds the maximum memory
    if (logText.length > MAX_LOG_MEMORY)
        logText = logText.slice(-MAX_LOG_MEMORY);

    set(logAtom, logText);
});

// Hooks
export default function useAppendToLog() {
    return appendToLogAtom;
}