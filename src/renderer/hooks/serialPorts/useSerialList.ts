import {atom, useAtom} from "jotai";
import VEXSerialPortInfo from "../../../types/serial/VEXSerialPortInfo.ts";

// Atoms
export const serialListAtom = atom<VEXSerialPortInfo[] | undefined>(undefined);

// Hooks
export default function useSerialList() {
    return useAtom(serialListAtom);
}