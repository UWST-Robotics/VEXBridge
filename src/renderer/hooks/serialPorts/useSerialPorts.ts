import {atom, useAtomValue} from "jotai";
import VEXSerialPortInfo from "../../../types/serial/VEXSerialPortInfo.ts";

export const serialPortsAtom = atom<VEXSerialPortInfo[]>([]);

export default function useSerialPorts() {
    return useAtomValue(serialPortsAtom);
}