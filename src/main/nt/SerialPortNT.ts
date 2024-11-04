import {SerialPort} from "serialport";
import {PortInfo} from "../serial";
import BlueBox from "../BlueBox.ts";
import SerialServer from "../serial/SerialServer.ts";

const POLL_INTERVAL = 1000;

export default class SerialPortNT {
    pollInterval?: NodeJS.Timeout;
    lastPorts: PortInfo[] = [];

    private static getPortNTPath(port: PortInfo) {
        return `serialPorts/${port.path.replace("/", "_")}`;
    }

    /**
     * Update the list of available ports over Network Tables
     */
    async updateAllPorts() {

        // Get all the ports
        const allPorts = await SerialPort.list();

        // Get Added Ports
        const addedPorts: PortInfo[] = allPorts.filter((port) => !this.lastPorts.some((lastPort) => lastPort.path === port.path));

        // Get Removed Ports
        const removedPorts: PortInfo[] = this.lastPorts.filter((lastPort) => !allPorts.some((port) => port.path === lastPort.path));

        // Update All Ports
        addedPorts.forEach(this.updatePort);
        removedPorts.forEach(this.onRemovePort);

        // Update Last Ports
        this.lastPorts = allPorts;
    }

    updatePort(port: PortInfo) {
        const currentPort = BlueBox.serial?.hardware.path;
        const ntPath = SerialPortNT.getPortNTPath(port);

        const portName = "friendlyName" in port ? port.friendlyName : port.path;

        BlueBox.serverTable.updateRecord(ntPath + "/name", portName?.toString());
        BlueBox.serverTable.updateRecord(ntPath + "/isActive", port.path === currentPort)
        BlueBox.serverTable.updateRecord(ntPath + "/isVEX", SerialServer.isVEXPort(port));
        BlueBox.serverTable.updateRecord(ntPath + "/path", port.path);
        BlueBox.serverTable.updateRecord(ntPath + "/manufacturer", port.manufacturer);
        BlueBox.serverTable.updateRecord(ntPath + "/serialNumber", port.serialNumber);
        BlueBox.serverTable.updateRecord(ntPath + "/pnpID", port.pnpId);
        BlueBox.serverTable.updateRecord(ntPath + "/locationID", port.locationId);
        BlueBox.serverTable.updateRecord(ntPath + "/productID", port.productId);
        BlueBox.serverTable.updateRecord(ntPath + "/vendorID", port.vendorId);
    }

    onRemovePort(port: PortInfo) {
        const ntPath = SerialPortNT.getPortNTPath(port);
        BlueBox.serverTable.removeRecordsInGroup(ntPath);
    }

    pollForChanges() {
        // Clear the interval if it exists
        if (this.pollInterval)
            clearInterval(this.pollInterval);

        // Update all ports every second
        this.pollInterval = setInterval(this.updateAllPorts.bind(this), POLL_INTERVAL);
    }
}