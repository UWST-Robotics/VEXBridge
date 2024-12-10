import BlueBox from "../BlueBox.ts";
import SerialServer from "../serial/SerialServer.ts";
import {mainWindow} from "../main.ts";
import StateManager from "./stateManager.ts";

export default function assignEvents(ipcMain: Electron.IpcMain) {
    ipcMain.on("setSerialPort", (_, port) => {
        // Close the current serial port and open a new one
        BlueBox.serial?.close();
        BlueBox.serial = new SerialServer(port);

        // Disable Auto Connect
        BlueBox.serialPollingService.setAutoConnect(false);
    });

    ipcMain.on("getAllRecords", () => {
        mainWindow?.webContents.send("onSetAllRecords", BlueBox.nt.records);
        mainWindow?.webContents.send("serialState", StateManager.serialState);
        mainWindow?.webContents.send("robotState", StateManager.robotState);
    });

    ipcMain.on("autoConnectSerial", () => {
        // Close the current serial port and enable auto connect
        BlueBox.serial?.close();
        BlueBox.serialPollingService.setAutoConnect(true);
    });
}