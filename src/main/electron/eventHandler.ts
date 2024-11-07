import BlueBox from "../BlueBox.ts";
import SerialServer from "../serial/SerialServer.ts";

export default function assignEvents(ipcMain: Electron.IpcMain) {
    ipcMain.on('setSerialPort', (_, port) => {
        // Close the current serial port and open a new one
        BlueBox.serial?.close();
        BlueBox.serial = new SerialServer(port);

        // Force update all ports
        //BlueBox.serialTable.lastPorts = [];
        //BlueBox.serialTable.updateAllPorts().catch(console.error);
    });

    ipcMain.on('getAllRecords', () => {
        BlueBox.mainWindow?.webContents.send("onSetAllRecords", BlueBox.nt.records);
    });
}