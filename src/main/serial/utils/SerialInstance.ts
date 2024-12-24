import {SerialPort} from "serialport";
import Logger from "../../common/Logger.ts";
import {EventEmitter} from "events";
import VEXSerialParser from "./VEXSerialParser.ts";
import NTSerialParser from "./NTSerialParser.ts";
import {Gpio} from "onoff";
import {RTS_PIN} from "../../common/Constants.ts";
import SerialState from "../../../types/serial/SerialState.ts";
import serialServer from "../localSerialInstance.ts";
import SerialConnectionService from "./SerialConnectionService.ts";
import SerialPollingService from "./SerialPollingService.ts";

export default class SerialInstance extends EventEmitter {

    rtsPin: Gpio | undefined;
    hardware: SerialPort | undefined;
    vexParser = new VEXSerialParser();
    ntParser = new NTSerialParser();
    connectionService = new SerialConnectionService();
    pollingService = new SerialPollingService();

    /**
     * Manages the serial connection to the VEX V5 Brain.
     * Emits "serial_state" when the state of the serial connection changes.
     * Emits "serial_log" when a log message is available.
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
            path: serialServer.hardware?.path ?? "N/A",
            baudRate: serialServer.hardware?.baudRate ?? -1,

            targetPath: serialServer.connectionService.targetPath,
            autoSelect: serialServer.connectionService.autoSelect
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
            baudRate: 9600,
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
        this.emit("serial_state", this.getState());
    }

    /**
     * Emits a log message
     * @param message - The message to emit
     */
    emitLog(message: string) {
        this.emit("serial_log", message);
    }

    /**
     * Emits the list of available serial ports.
     * Called after the list is updated.
     */
    emitList() {
        this.emit("serial_list", this.pollingService.serialPorts);
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