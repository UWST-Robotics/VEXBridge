import {SerialPort} from "serialport";
import SerialPortInfo from "../../types/SerialPortInfo.ts";
import getVEXType from "./utils/getVEXType.ts";
import BlueBox from "../BlueBox.ts";
import Service from "../common/Service.ts";

export default class SerialPollingService extends Service {
    constructor() {
        super(1000);
    }

    private async updateAsync() {
        const allPorts: SerialPortInfo[] = [];

        // Get local ports
        const localPorts = await SerialPort.list();
        localPorts.forEach((rawPortInfo) => {
            allPorts.push({
                ...rawPortInfo,
                isRemote: false,
                vexType: getVEXType(rawPortInfo)
            });
        });

        // TODO: Scan for remote ports


        // Send the updated list of ports to renderer
        BlueBox.mainWindow?.webContents.send("onSerialPorts", allPorts);

    }

    update() {
        this.updateAsync().catch(console.error);
    }
}