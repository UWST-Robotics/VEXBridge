import {SerialPort} from "serialport";
import getVEXType from "./utils/getVEXType.ts";
import BlueBox from "../BlueBox.ts";
import Service from "../common/Service.ts";
import VEXSerialType from "../../types/VEXSerialType.ts";
import SerialServer from "./SerialServer.ts";
import Logger from "../common/Logger.ts";

export default class SerialPollingService extends Service {
    private autoConnect = true;

    constructor() {
        super(1000);
    }

    setAutoConnect(autoConnect: boolean) {
        Logger.info(`${autoConnect ? "Enabling" : "Disabling"} auto serial connection`);
        this.autoConnect = autoConnect;
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
        BlueBox.mainWindow?.webContents.send("onSerialPorts", localPortsWithType);

        // Auto Connect
        if (!this.autoConnect)
            return;
        const port = localPortsWithType.find((port) => port.vexType !== VEXSerialType.NONE);
        if (!port)
            return;
        if (port.path === BlueBox.serial?.state.port && BlueBox.serial?.state.isConnected)
            return;
        BlueBox.serial?.close();
        BlueBox.serial = new SerialServer(port.path);
    }

    update() {
        this.updateAsync().catch(console.error);
    }
}