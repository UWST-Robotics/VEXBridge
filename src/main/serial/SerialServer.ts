import {SerialPort} from "serialport";
import Logger from "../common/Logger.ts";
import Heartbeat from "../common/Heartbeat.ts";
import NTValue from "../../types/NTValue.ts";
import {HEARTBEAT_INTERVAL} from "../common/Constants.ts";
import VEXSerialParser from "./VEXSerialParser.ts";
import BlueBox from "../BlueBox.ts";
import SerialState from "../../types/SerialState.ts";
import RobotState from "../../types/RobotState.ts";

export default class SerialServer {

    hardware: SerialPort;
    parser: VEXSerialParser;
    heartbeat: Heartbeat;
    state: SerialState;

    constructor(serialPath: string) {

        // Create Serial Port
        this.hardware = new SerialPort({
            path: serialPath,
            baudRate: 9600
        });

        // Create Heartbeat
        this.heartbeat = new Heartbeat(HEARTBEAT_INTERVAL, () => {
            // Update the robot state
            BlueBox.mainWindow?.webContents.send("onRobotState", {isRobotOnline: false});
        });

        // Create Parser
        this.parser = new VEXSerialParser();
        this.hardware.pipe(this.parser);
        this.parser.on("sout", this.onData.bind(this));
        this.parser.on("serr", this.onError.bind(this));

        // Set State
        this.state = {
            isConnected: false,
            port: serialPath
        };
        this.setState(this.state);

        // Listen for Events
        this.hardware.on("open", this.onSerialOpen.bind(this));
        this.hardware.on("error", this.onSerialError.bind(this));
        this.hardware.on("close", this.onSerialClose.bind(this));
    }

    setState(state: SerialState) {
        this.state = state;
        BlueBox.mainWindow?.webContents.send("onSerialState", state);
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
        this.setState({...this.state, isConnected: true});
    }

    private onSerialError(error: Error) {
        Logger.error(`Serial port error: ${error.message}`);
        this.setState({...this.state, isConnected: false});
    }

    private onSerialClose() {
        Logger.info(`Serial port closed on ${this.hardware.path}`);
        this.setState({...this.state, isConnected: false});
    }

    private onError(error: string) {
        BlueBox.mainWindow?.webContents.send("onLog", `\x1b[31m${error}\x1b[0m`);
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
                BlueBox.mainWindow?.webContents.send("onUpdateRecord", record);
            }

            // Reset Table
            else if (data.startsWith("__NTRESET__")) {

                // Reset the network table
                BlueBox.nt.records = [];
                BlueBox.mainWindow?.webContents.send("onSetAllRecords", []);
            }

            // Heartbeat
            else if (data.startsWith("__NTHEARTBEAT__")) {

                // Reset the heartbeat
                this.heartbeat.beat();

                // Update the robot state
                const robotState: RobotState = {isEnabled: true};
                BlueBox.mainWindow?.webContents.send("onRobotState", robotState);
            }

            // Normal Log
            else {
                BlueBox.mainWindow?.webContents.send("onLog", data);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            Logger.error(`Error parsing data: ${message}`);
        }
    }
}