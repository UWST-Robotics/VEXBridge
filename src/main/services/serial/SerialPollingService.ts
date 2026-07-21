import getAvailableSerialPorts from "../../common/getAvailableSerialPorts.ts";
import {serialListEvent} from "../../common/EventHandler.ts";
import settingsService from "../SettingsService.ts";

export class SerialPollingService {
    private lastSerialPaths: string[] = [];

    /**
     * Continuously polls the serial ports for VEX system ports.
     */
    init() {
        const {pollInterval} = settingsService.get();
        setInterval(this.pollAsync.bind(this), pollInterval);
    }

    private async pollAsync() {

        // Poll available serial ports
        const serialPorts = await getAvailableSerialPorts();

        // Compare the new serial paths to the last serial paths
        const serialPaths = serialPorts.map(port => port.path);
        const addedPaths = serialPaths.filter(path => !this.lastSerialPaths.includes(path));
        const removedPaths = this.lastSerialPaths.filter(path => !serialPaths.includes(path));
        this.lastSerialPaths = serialPaths;

        // If the serial ports have changed, emit the new state
        const isChanged = addedPaths.length > 0 || removedPaths.length > 0;
        if (isChanged)
            serialListEvent.emit(serialPorts);
    }
}

const serialPollingService = new SerialPollingService();
export default serialPollingService;