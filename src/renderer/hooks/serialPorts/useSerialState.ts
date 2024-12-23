import SerialState from "../../../types/serial/SerialState.ts";
import {atom, useAtomValue} from "jotai";

// Atoms
export const serialStateAtom = atom<SerialState>({isConnected: false});

// Hooks
export default function useSerialState() {
    return useAtomValue(serialStateAtom);
}