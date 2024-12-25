import {Gpio} from "onoff";
import {SerialPort} from "serialport";
import VEXSerialParser from "../../common/VEXSerialParser.ts";
import NTSerialParser from "../../common/NTSerialParser.ts";
import {BAUD_RATE, RTS_PIN} from "../../common/Constants.ts";
import SerialState from "../../../types/serial/SerialState.ts";
import Logger from "../../common/Logger.ts";
import {EventEmitter} from "events";
import serialConnectionService from "./SerialConnectionService.ts";

/**
 * Handles serial communication with the VEX V5 brain
 */
export class SerialService {

    private eventEmitter = new EventEmitter();
    private rtsPin: Gpio | undefined;
    private hardware: SerialPort | undefined;
    private vexParser = new VEXSerialParser();
    private ntParser = new NTSerialParser();

    constructor() {
        // Set Default RTS Pin
        if (process.platform === "linux")
            this.setRTSPin(RTS_PIN);

        // Pipe Output from VEX Parser to NT Parser
        this.vexParser.on("sout", this.ntParser.onData.bind(this.ntParser));
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
        this.vexParser.listenTo(this.hardware);

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
        this.eventEmitter.emit("serial_state", this.getState());
    }

    /**
     * Listens for changes to the serial state
     * @param callback - The callback to call when the state changes
     */
    onStateChange(callback: (state: SerialState) => void) {
        this.eventEmitter.on("serial_state", callback);
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
     * Encodes data to COBS and writes it to the serial port.
     * Also controls the RTS pin if set.
     * @param data - The data to write
     */
    async write(data: Buffer) {

        // Pull RTS high
        await this.rtsPin?.write(1);

        // Write data to serial port
        await new Promise((resolve, reject) => {
            this.hardware?.write(data, (error) => {
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