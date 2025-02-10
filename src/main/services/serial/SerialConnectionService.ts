import getAvailableSerialPorts from "../../common/getAvailableSerialPorts.ts";
import VEXSerialType from "../../../types/serial/VEXSerialType.ts";
import {SERIAL_POLLING_INTERVAL, SERIAL_PORT} from "../../common/Constants.ts";
import serialService from "./SerialService.ts";
import logger from "../../common/Logger.ts";

export class SerialConnectionService {
    autoSelect = true;
    targetPath = SERIAL_PORT;
    private isPolling = false;

    /**
     * Continuously polls the serial ports for VEX system ports.
     */
    init() {
        setInterval(this.poll.bind(this), SERIAL_POLLING_INTERVAL);
    }

    /**
     * Enables or disables auto path selection.
     * If enabled, the service will automatically switch the serial port to an available VEX system port.
     * @param autoSelect - Whether to enable auto port selection
     */
    enableAutoSelect(autoSelect = true) {
        logger.info(`${autoSelect ? "Enabling" : "Disabling"} auto port selection`);
        this.autoSelect = autoSelect;
        serialService.emitState();
    }

    /**
     * Manually sets the target serial port path.
     * @param targetPath - The target serial port path (e.g. "COM3" or "/dev/ttyUSB0")
     */
    setTargetPath(targetPath: string) {
        logger.info(`Searching for serial @ ${targetPath}...`);
        this.targetPath = targetPath;
        serialService.emitState();
    }

    private poll() {
        if (this.isPolling)
            return;

        this.isPolling = true;
        this.pollAsync()
            .catch(logger.error)
            .finally(() => this.isPolling = false);
    }

    private async pollAsync() {
        // Poll available serial ports
        const availableSerialPorts = await getAvailableSerialPorts();

        // If auto selection is enabled, select a VEX user port
        if (this.autoSelect) {
            const vexPort = availableSerialPorts.find(port => port.vexType === VEXSerialType.USER);
            if (vexPort)
                this.targetPath = vexPort.path;
        }

        // Abort if we are already connected to the target port
        const serialState = serialService.getState();
        if (serialState.isOpen && serialState.path === this.targetPath)
            return;

        // Check if the target port is available
        const targetPort = availableSerialPorts.find(port => port.path === this.targetPath);

        // If so, attempt to connect to the target port
        if (targetPort)
            await serialService.connect(this.targetPath);
    }
}

const serialConnectionService = new SerialConnectionService();
export default serialConnectionService;