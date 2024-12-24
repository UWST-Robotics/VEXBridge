import {SerialPort} from "serialport";
import Logger from "../../common/Logger.ts";
import {EventEmitter} from "events";
import VEXSerialParser from "./VEXSerialParser.ts";
import NTSerialParser from "./NTSerialParser.ts";
import {Gpio} from "onoff";
import {RTS_PIN} from "../../common/Constants.ts";
import SerialState from "../../../types/serial/SerialState.ts";
import serialServer from "../localSerialInstance.ts";

export default class SerialInstance extends EventEmitter {

    rtsPin: Gpio | undefined;
    hardware: SerialPort | undefined;
    vexParser = new VEXSerialParser();
    ntParser = new NTSerialParser();

    /**
     * Manages the serial connection to the VEX V5 Brain.
     * Emits "serial_open" when the serial port is opened.
     * Emits "serial_error" when there is an error with the serial port.
     * Emits "serial_close" when the serial port is closed.
     */
    constructor() {
        super();

        // Set Default RTS Pin
        if (process.platform === "linux")
            this.setRTSPin(RTS_PIN);

        // Log Serial Port Events
        this.on("serial_open", this.onSerialOpen.bind(this));
        this.on("serial_error", this.onSerialError.bind(this));
        this.on("serial_close", this.onSerialClose.bind(this));

        // Pipe Output from VEX Parser to NT Parser
        this.vexParser.on("sout", this.ntParser.onData.bind(this.ntParser));
    }

    /**
     * Returns the current state of the serial connection
     * @returns The current state as a `SerialState` object
     */
    getState(): SerialState {
        return {
            isOpen: serialServer.hardware?.isOpen ?? false,
            port: serialServer.hardware?.port ?? "N/A",
            path: serialServer.hardware?.path ?? "N/A",
            baudRate: serialServer.hardware?.baudRate ?? -1
        };
    }

    /**
     * Connects to a serial port
     * @param serialPath - The port to connect to (e.g. "COM3")
     */
    async connect(serialPath: string) {

        // Create Serial Port
        this.hardware = new SerialPort({
            path: serialPath,
            baudRate: 9600,
            autoOpen: false
        });

        // Relay Serial Port Events
        this.hardware.on("open", () => this.emit("serial_open", this.getState()));
        this.hardware.on("error", () => this.emit("serial_error", this.getState()));
        this.hardware.on("close", () => this.emit("serial_close", this.getState()));

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

    private onSerialOpen() {
        Logger.info("Serial port opened on " + this.hardware?.path);
    }

    private onSerialError(error: Error) {
        Logger.error(`Serial port error: ${error.message}`);
    }

    private onSerialClose() {
        Logger.info(`Serial port closed on ${this.hardware?.path}`);
    }
}