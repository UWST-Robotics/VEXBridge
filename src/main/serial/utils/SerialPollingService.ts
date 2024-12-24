import getAvailableSerialPorts from "./getAvailableSerialPorts.ts";
import {SERIAL_POLLING_INTERVAL} from "../../common/Constants.ts";
import localSerialInstance from "../localSerialInstance.ts";
import VEXSerialPortInfo from "../../../types/serial/VEXSerialPortInfo.ts";

export default class SerialPollingService {
    serialPorts: VEXSerialPortInfo[] = [];
    private lastSerialPaths: string[] = [];

    /**
     * Continuously polls the serial ports for VEX system ports.
     */
    constructor() {
        setInterval(this.pollAsync.bind(this), SERIAL_POLLING_INTERVAL);
    }

    private async pollAsync() {
        // Poll available serial ports
        this.serialPorts = await getAvailableSerialPorts();

        // Compare the new serial paths to the last serial paths
        const serialPaths = this.serialPorts.map(port => port.path);
        const addedPaths = serialPaths.filter(path => !this.lastSerialPaths.includes(path));
        const removedPaths = this.lastSerialPaths.filter(path => !serialPaths.includes(path));
        this.lastSerialPaths = serialPaths;

        // If the serial ports have changed, emit the new state
        const isChanged = addedPaths.length > 0 || removedPaths.length > 0;
        if (isChanged)
            localSerialInstance.emitList();
    }
}