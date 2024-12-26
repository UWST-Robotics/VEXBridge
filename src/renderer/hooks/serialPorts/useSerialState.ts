import SerialState from "../../../types/serial/SerialState.ts";
import {atom, useAtomValue} from "jotai";

// Atoms
export const serialStateAtom = atom<SerialState | undefined>(undefined);

// Hooks
export default function useSerialState() {
    return useAtomValue(serialStateAtom);
}