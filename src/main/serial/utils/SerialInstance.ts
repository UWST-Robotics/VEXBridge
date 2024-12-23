import {SerialPort} from "serialport";
import Logger from "../../common/Logger.ts";
import {EventEmitter} from "events";
import VEXSerialParser from "./VEXSerialParser.ts";
import NTSerialParser from "./NTSerialParser.ts";

export default class SerialInstance extends EventEmitter {

    hardware: SerialPort | undefined;
    vexParser = new VEXSerialParser();
    ntParser = new NTSerialParser();

    /**
     * Manages the serial connection to the VEX V5 Brain.
     * Emits "serial_open", "serial_error", and "serial_close" events.
     */
    constructor() {
        super();

        // Listen to parser events
        this.vexParser.on("sout", this.emit.bind(this, "sout"));
        this.vexParser.on("serr", this.emit.bind(this, "serr"));
        this.vexParser.on("kdbg", this.emit.bind(this, "kdbg"));

        // Pipe Output to NT Parser
        this.on("sout", this.ntParser.onData.bind(this.ntParser));
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

        // Log Serial Events
        this.hardware.on("open", this.onSerialOpen.bind(this));
        this.hardware.on("error", this.onSerialError.bind(this));
        this.hardware.on("close", this.onSerialClose.bind(this));

        // Relay Events
        this.hardware.on("open", () => this.emit("serial_open"));
        this.hardware.on("error", () => this.emit("serial_error"));
        this.hardware.on("close", () => this.emit("serial_close"));

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