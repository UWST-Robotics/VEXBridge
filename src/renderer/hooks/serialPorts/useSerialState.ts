import SerialState from "../../../types/serial/SerialState.ts";
import {atom, useAtomValue} from "jotai";

// Atoms
export const serialStateAtom = atom<SerialState>({
    isOpen: false,
    port: "",
    path: "",
    baudRate: 0
});

// Hooks
export default function useSerialState() {
    return useAtomValue(serialStateAtom);
}