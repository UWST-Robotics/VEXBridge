import NetworkTable from "./nt/NetworkTable.ts";
import {DEFAULT_SERIAL_PORT} from "./common/Constants.ts";
import SerialServer from "./serial/SerialServer.ts";
import SerialPortNT from "./nt/SerialPortNT.ts";
import ServerNT from "./nt/ServerNT.ts";
import Logger from "./common/Logger.ts";

export default abstract class BlueBox {
    static nt = new NetworkTable();
    static serialTable = new SerialPortNT();
    static serverTable = new ServerNT();
    static mainWindow: Electron.BrowserWindow | undefined;

    static serial: SerialServer | undefined;

    static listen() {
        this.serialTable.pollForChanges();
        SerialServer.findVEXPorts()
            .then((ports) => {
                // Check if there are any VEX ports
                if (ports.length === 0) {
                    Logger.error("No VEX Ports Found");
                    return;
                }

                // Open the first port
                BlueBox.serial?.close();
                BlueBox.serial = new SerialServer(ports[0].path || DEFAULT_SERIAL_PORT);
            })
            .catch(console.error);
    }
}