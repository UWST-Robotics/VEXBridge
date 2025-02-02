import {Gpio} from "onoff";
import {SerialPort} from "serialport";
import {BAUD_RATE, RTS_PIN} from "../../common/Constants.ts";
import SerialState from "../../../types/serial/SerialState.ts";
import Logger from "../../common/Logger.ts";
import serialConnectionService from "./SerialConnectionService.ts";
import {serialStateEvent} from "../../common/EventHandler.ts";
import SerialPacketParser from "../../common/serial/SerialPacketParser.ts";

/**
 * Handles serial communication with the VEX V5 brain
 */
export class SerialService {

    private rtsPin: Gpio | undefined;
    private hardware: SerialPort | undefined;
    private packetParser = new SerialPacketParser();

    constructor() {
        // Set Default RTS Pin
        if (process.platform === "linux")
            this.setRTSPin(RTS_PIN);
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
        Logger.info(`Connecting to serial port '${serialPath}'`);

        // Close existing serial port
        this.close();

        // Create Serial Port
        this.hardware = new SerialPort({
            path: serialPath,
            baudRate: BAUD_RATE,
            autoOpen: false
        });

        // Relay Serial Port Events
        this.hardware.on("open", () => this.emitState());
        this.hardware.on("error", () => this.emitState());
        this.hardware.on("close", () => this.emitState());

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
     * Sets the GPIO pin for the RTS signal.
     * GPIO pin is pulled high while transmitting serial data.
     * @param pinNumber - The pin
     */
    setRTSPin(pinNumber: number) {
        this.rtsPin = new Gpio(pinNumber, "out");
    }

    /**
     * Writes buffer to the serial port.
     * Also controls the RTS pin if set.
     * @param buffer - The buffer to write
     */
    async write(buffer: Buffer) {
        Logger.info(`Writing ${buffer.length} bytes to serial port: ${buffer.toString("hex")}`);

        // Pull RTS high
        await this.rtsPin?.write(1);

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
        await this.rtsPin?.write(0);
    }
}

const serialService = new SerialService();
export default serialService;