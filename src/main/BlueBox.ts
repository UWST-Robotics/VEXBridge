import NetworkTable from "./nt/NetworkTable.ts";
import SerialServer from "./serial/SerialServer.ts";
import SerialPollingService from "./serial/SerialPollingService.ts";
import RemoteSerialPollingService from "./serial/remote/RemoteSerialPollingService.ts";


export default abstract class BlueBox {
    static nt = new NetworkTable();
    static serialPollingService = new SerialPollingService();
    static remoteSerialPollingService = new RemoteSerialPollingService();
    static mainWindow: Electron.BrowserWindow | undefined;
    static serial: SerialServer | undefined;

    static listen() {
        // Start Services
        this.serialPollingService.start();
        this.remoteSerialPollingService.start();
    }
}