import NetworkTable from "./nt/NetworkTable.ts";
import {DEFAULT_SERIAL_PORT} from "./common/Constants.ts";
import SerialServer from "./serial/SerialServer.ts";
import SerialPollingService from "./serial/SerialPollingService.ts";
import ServerNT from "./nt/ServerNT.ts";
import Logger from "./common/Logger.ts";
import RemoteSerialPollingService from "./serial/remote/RemoteSerialPollingService.ts";

export default abstract class BlueBox {
    static nt = new NetworkTable();
    static serialService = new SerialPollingService();
    static remoteSerialService = new RemoteSerialPollingService();
    static serverTable = new ServerNT();
    static mainWindow: Electron.BrowserWindow | undefined;

    static serial: SerialServer | undefined;

    static listen() {
        this.serialService.start();
        this.remoteSerialService.start();
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

        // Debugging
        // const makeDebugValue = (key: string) => {
        //     let value = 0;
        //     const offset = Math.random() * 2;
        //     setInterval(() => {
        //         value += Math.random();
        //         const record = {key, value: Math.sin(value * 0.1) + offset};
        //         BlueBox.nt.addOrUpdate(record);
        //         BlueBox.mainWindow?.webContents.send("onUpdateRecord", record);
        //     }, 100 * Math.random());
        // };
        //
        // for (let i = 0; i < 20; i++) {
        //     makeDebugValue(`debug${i}`);
        // }
    }
}