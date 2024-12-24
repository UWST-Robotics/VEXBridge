import {useAtom} from "jotai";
import VEXSerialPortInfo from "../../../types/serial/VEXSerialPortInfo.ts";
import {atomWithDefault} from "jotai/utils";
import fetchAPIEndpoint from "../../utils/fetchAPIEndpoint.ts";

const API_ENDPOINT = "/api/serial/list";

// Atoms
export const serialPortsAtom = atomWithDefault(() => fetchAPIEndpoint<VEXSerialPortInfo[]>(API_ENDPOINT));

// Hooks
export default function useSerialPorts() {
    return useAtom(serialPortsAtom);
}