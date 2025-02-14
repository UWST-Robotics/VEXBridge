import {SerialPort} from "serialport";
import SerialState from "../../../types/serial/SerialState.ts";
import serialConnectionService from "./SerialConnectionService.ts";
import {serialStateEvent} from "../../common/EventHandler.ts";
import SerialPacketParser from "../../serial/SerialPacketParser.ts";
import Rpio from "rpio";
import logger from "../../common/Logger.ts";
import settingsService from "../SettingsService.ts";

/**
 * Handles serial communication with the VEX V5 brain
 */
export class SerialService {
    private hardware: SerialPort | undefined;
    private packetParser = new SerialPacketParser();

    constructor() {
        const {enableRTS, gpioRTSPin} = settingsService.get();

        // Initialize RTS Pin
        if (enableRTS) {
            logger.info(`Setting RTS pin to GPIO ${gpioRTSPin}`);
            Rpio.open(gpioRTSPin, Rpio.OUTPUT, Rpio.LOW);
        }
    }

    /**
     * Returns the current state of the serial connection
     * @returns The current state as a `SerialState` object
     */
    getState(): SerialState {
        return {
            isOpen: this.hardware?.isOpen ?? false,
            path: this.hardware?.path ?? "N/A",
            baudRate: this.hardware?.baudRate ?? -1,

            targetPath: serialConnectionService.targetPath,
            autoSelect: serialConnectionService.autoSelect
        };
    }

    /**
     * Connects to a serial port
     * @param serialPath - The port to connect to (e.g. "COM3")
     */
    async connect(serialPath: string) {
        logger.info(`Connecting to serial port @ ${serialPath}...`);

        // Close existing serial port
        this.close();

        // Create Serial Port
        this.hardware = new SerialPort({
            path: serialPath,
            baudRate: settingsService.get().baudRate,
            autoOpen: false
        });

        // Relay Serial Port Events
        this.hardware.on("open", () => this.emitState());
        this.hardware.on("error", () => this.emitState());
        this.hardware.on("close", () => this.emitState());

        // Log Serial Port Events
        this.hardware.on("open", () => logger.info(`Opened serial port @ ${serialPath}`));
        this.hardware.on("error", (error) => logger.error(`Serial port error @ ${serialPath}: ${error}`));
        this.hardware.on("close", () => logger.info(`Closed serial port @ ${serialPath}`));

        // Pipe Serial Data to VEX Parser
        this.packetParser.listenTo(this.hardware);

        // Asynchronously open the serial port
        await new Promise((resolve, reject) => {
            this.hardware?.open((error) => {
                if (error)
                    reject(error);
                else
                    resolve("Serial port opened");
            });
        });
    }

    /**
     * Emits the current state of the serial connection.
     * Called after any state change.
     */
    emitState() {
        serialStateEvent.emit(this.getState());
    }

    /**
     * Closes the serial port
     */
    close() {
        if (this.hardware?.isOpen)
            this.hardware.close();

        this.hardware = undefined;
    }

    /**
     * Controls the RTS pin to write a raw buffer to the serial port.
     * Use `sendSerialPacket` to send a full packet instead.
     * @param buffer - The buffer to write
     * @returns A promise that resolves when the write operation is complete
     */
    async write(buffer: Buffer) {
        const {enableRTS, gpioRTSPin, gpioPreDelay, gpioPostDelay} = settingsService.get();

        // Pull RTS high
        if (enableRTS) {
            Rpio.write(gpioRTSPin, Rpio.HIGH);
            Rpio.msleep(gpioPreDelay);
        }

        // Write data to serial port
        await new Promise((resolve, reject) => {
            this.hardware?.write(buffer, (error) => {
                if (error)
                    reject(error);
                else
                    resolve("Data written");
            });
        });

        // Pull RTS low
        if (enableRTS) {
            Rpio.msleep(gpioPostDelay);
            Rpio.write(gpioRTSPin, Rpio.LOW);
        }
    }
}

const serialService = new SerialService();
export default serialService;