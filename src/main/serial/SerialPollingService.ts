import {SerialPort} from "serialport";
import getVEXType from "./utils/getVEXType.ts";
import BlueBox from "../BlueBox.ts";
import Service from "../common/Service.ts";
import VEXSerialType from "../../types/VEXSerialType.ts";
import SerialServer from "./SerialServer.ts";
import Logger from "../common/Logger.ts";
import StateManager from "../electron/stateManager.ts";
import {mainWindow} from "../main.ts";

export default class SerialPollingService extends Service {
    private autoConnect = true;

    constructor() {
        super(1000);
        StateManager.updateSerialState({isAutomaticEnabled: this.autoConnect});
    }

    setAutoConnect(autoConnect: boolean) {
        Logger.info(`${autoConnect ? "Enabling" : "Disabling"} auto serial connection`);
        this.autoConnect = autoConnect;
        StateManager.updateSerialState({isAutomaticEnabled: autoConnect});
    }

    private async updateAsync() {

        // Get local ports
        const localPorts = await SerialPort.list();
        const localPortsWithType = localPorts.map((port) => ({
            ...port,
            vexType: getVEXType(port),
            isRemote: false
        }));

        // Send the updated list of ports to renderer
        mainWindow?.webContents.send("onSerialPorts", localPortsWithType);

        // Auto Connect
        if (!this.autoConnect)
            return;
        const port = localPortsWithType.find((port) => port.vexType === VEXSerialType.USER);
        if (!port)
            return;
        if (port.path === StateManager.serialState.port && StateManager.serialState.isConnected)
            return;
        BlueBox.serial?.close();
        BlueBox.serial = new SerialServer(port.path);
    }

    update() {
        this.updateAsync().catch(console.error);
    }
}