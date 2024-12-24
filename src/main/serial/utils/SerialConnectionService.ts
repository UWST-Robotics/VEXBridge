import getAvailableSerialPorts from "./getAvailableSerialPorts.ts";
import VEXSerialType from "../../../types/serial/VEXSerialType.ts";
import {SERIAL_POLLING_INTERVAL} from "../../common/Constants.ts";
import localSerialInstance from "../localSerialInstance.ts";
import Logger from "../../common/Logger.ts";

export default class SerialConnectionService {
    autoSelect = true;
    targetPath = "";
    private isPolling = false;

    /**
     * Continuously polls the serial ports for VEX system ports.
     */
    constructor() {
        setInterval(this.poll.bind(this), SERIAL_POLLING_INTERVAL);
    }

    /**
     * Enables or disables auto path selection.
     * If enabled, the service will automatically switch the serial port to an available VEX system port.
     * @param autoSelect - Whether to enable auto port selection
     */
    enableAutoSelect(autoSelect = true) {
        Logger.info(`${autoSelect ? "Enabling" : "Disabling"} auto port selection`);
        this.autoSelect = autoSelect;
        localSerialInstance.emitState();
    }

    /**
     * Manually sets the target serial port path.
     * @param targetPath - The target serial port path (e.g. "COM3" or "/dev/ttyUSB0")
     */
    setTargetPath(targetPath: string) {
        Logger.info(`Setting target serial port to '${targetPath}'`);
        this.targetPath = targetPath;
        localSerialInstance.emitState();
    }

    private poll() {
        if (this.isPolling)
            return;

        this.isPolling = true;
        this.pollAsync()
            .catch(Logger.error)
            .finally(() => this.isPolling = false);
    }

    private async pollAsync() {
        // Poll available serial ports
        const availableSerialPorts = await getAvailableSerialPorts();

        // If auto selection is enabled, select a VEX system port
        if (this.autoSelect) {
            const vexPort = availableSerialPorts.find(port => port.vexType === VEXSerialType.SYSTEM);
            if (vexPort)
                this.targetPath = vexPort.path;
        }

        // Abort if we are already connected to the target port
        const serialState = localSerialInstance.getState();
        if (serialState.isOpen && serialState.path === this.targetPath)
            return;

        // Check if the target port is available
        const targetPort = availableSerialPorts.find(port => port.path === this.targetPath);

        // If so, attempt to connect to the target port
        if (targetPort)
            await localSerialInstance.connect(this.targetPath);
    }
}