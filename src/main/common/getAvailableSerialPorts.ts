import {SerialPort} from "serialport";
import getVEXType from "./getVEXType.ts";
import SerialPortInfo from "../../types/serial/SerialPortInfo.ts";
import VEXSerialPortInfo from "../../types/serial/VEXSerialPortInfo.ts";

/**
 * Get a list of available serial ports and their VEX type.
 * @returns A list of available serial ports and their VEX type.
 */
export default async function getAvailableSerialPorts() {
    const serialPorts = await SerialPort.list() as SerialPortInfo[];
    const vexSerialPorts: VEXSerialPortInfo[] = serialPorts.map(port => ({
        ...port,
        vexType: getVEXType(port)
    }));

    return vexSerialPorts;
}