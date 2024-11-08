import BlueBox from "../BlueBox.ts";
import SerialServer from "../serial/SerialServer.ts";

export default function assignEvents(ipcMain: Electron.IpcMain) {
    ipcMain.on("setSerialPort", (_, port) => {
        // Close the current serial port and open a new one
        BlueBox.serial?.close();
        BlueBox.serial = new SerialServer(port);

        // Disable Auto Connect
        BlueBox.serialPollingService.setAutoConnect(false);
    });

    ipcMain.on("getAllRecords", () => {
        BlueBox.mainWindow?.webContents.send("onSetAllRecords", BlueBox.nt.records);
    });

    ipcMain.on("autoConnectSerial", () => {
        // Close the current serial port and enable auto connect
        BlueBox.serial?.close();
        BlueBox.serialPollingService.setAutoConnect(true);
    });
}