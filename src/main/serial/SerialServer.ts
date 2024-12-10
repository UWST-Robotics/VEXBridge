import {SerialPort} from "serialport";
import Logger from "../common/Logger.ts";
import Heartbeat from "../common/Heartbeat.ts";
import NTValue from "../../types/NTValue.ts";
import {HEARTBEAT_INTERVAL} from "../common/Constants.ts";
import VEXSerialParser from "./VEXSerialParser.ts";
import BlueBox from "../BlueBox.ts";
import {mainWindow} from "../main.ts";
import StateManager from "../electron/stateManager.ts";

export default class SerialServer {

    hardware: SerialPort;
    parser: VEXSerialParser;
    heartbeat: Heartbeat;

    constructor(serialPath: string) {

        // Create Serial Port
        this.hardware = new SerialPort({
            path: serialPath,
            baudRate: 9600
        });

        // Create Heartbeat
        this.heartbeat = new Heartbeat(HEARTBEAT_INTERVAL, () => {
            StateManager.updateRobotState({isEnabled: false});
        });

        // Create Parser
        this.parser = new VEXSerialParser(this.hardware);
        // this.hardware.pipe(this.parser);
        this.parser.on("sout", this.onData.bind(this));
        this.parser.on("serr", this.onError.bind(this));
        this.parser.on("kdbg", this.onDebug.bind(this));

        // Set State
        StateManager.updateSerialState({isConnected: false, port: serialPath});

        // Listen for Events
        this.hardware.on("open", this.onSerialOpen.bind(this));
        this.hardware.on("error", this.onSerialError.bind(this));
        this.hardware.on("close", this.onSerialClose.bind(this));
    }

    /**
     * Close the serial port
     */
    close() {
        if (this.hardware.isOpen)
            this.hardware.close();
    }

    private onSerialOpen() {
        Logger.info("Serial port opened on " + this.hardware.path);
        StateManager.updateSerialState({isConnected: true});
    }

    private onSerialError(error: Error) {
        Logger.error(`Serial port error: ${error.message}`);
        StateManager.updateSerialState({isConnected: false});
    }

    private onSerialClose() {
        Logger.info(`Serial port closed on ${this.hardware.path}`);
        StateManager.updateSerialState({isConnected: false});
    }

    private onError(error: string) {
        mainWindow?.webContents.send("onLog", `\x1b[31m${error}\x1b[0m`);
    }

    private onDebug(debug: string) {
        mainWindow?.webContents.send("onLog", `\x1b[90m${debug}\x1b[0m`);
    }

    private onData(_data: unknown) {
        try {
            // Parse Data
            const data = _data?.toString() ?? "";

            // Update Value
            if (data.startsWith("__NTUPDATE__")) {

                // Parse Data
                const [, key] = data.split(" ");
                const stringValue = data.split(" ").slice(2).join(" ");

                // Parse the value
                const lowerCaseValue = stringValue.toLowerCase();
                let value: NTValue = stringValue;
                if (lowerCaseValue === "true" || lowerCaseValue === "false")
                    value = stringValue === "true";
                else if (!isNaN(Number(stringValue)))
                    value = Number(stringValue);


                // Update the network table
                const record = {key, value};
                BlueBox.nt.addOrUpdate(record);
                mainWindow?.webContents.send("onUpdateRecord", record);
            }

            // Reset Table
            else if (data.startsWith("__NTRESET__")) {

                // Reset the network table
                BlueBox.nt.records = [];
                mainWindow?.webContents.send("onSetAllRecords", []);
            }

            // Heartbeat
            else if (data.startsWith("__NTHEARTBEAT__")) {

                // Reset the heartbeat
                this.heartbeat.beat();

                // Update the robot state
                StateManager.updateRobotState({isEnabled: true});
            }

            // Normal Log
            else {
                mainWindow?.webContents.send("onLog", data);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            Logger.error(`Error parsing data: ${message}`);
        }
    }
}