import {SerialPort} from "serialport";
import SerialPortInfo from "../../types/SerialPortInfo.ts";
import getVEXType from "./utils/getVEXType.ts";
import BlueBox from "../BlueBox.ts";

const POLL_INTERVAL = 1000;

export default class SerialPollingService {
    pollInterval?: NodeJS.Timeout;

    /**
     * Update the list of available ports over Network Tables
     */
    private async updateAllPorts() {
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

    startService() {
        // Clear the interval if it exists
        if (this.pollInterval)
            clearInterval(this.pollInterval);

        // Update all ports every second
        this.pollInterval = setInterval(this.updateAllPorts.bind(this), POLL_INTERVAL);
    }
}