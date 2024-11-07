import Service from "../../common/Service.ts";
import BridgeQuery from "../../../types/BridgeQuery.ts";
import BlueBox from "../../BlueBox.ts";

export default class RemoteSerialPollingService extends Service {
    constructor() {
        super(5000);
    }

    /**
     * Gets a list of all the default locations to scan for.
     * @returns {string[]} List of IPv4 addresses and hostnames
     */
    getDefaultIPs() {
        return [
            "127.0.0.1", // Local Host
            "bluebox.local", // BlueBox Hostname
            "raspberrypi.local" // Pi Hostname
        ];
    }

    private async updateAsync() {
        const queryResults: BridgeQuery[] = [];

        for (const ip of this.getDefaultIPs()) {
            try {
                const queryURL = `http://${ip}:8080/query`;
                const response = await fetch(queryURL);
                const query = await response.json() as BridgeQuery;
                queryResults.push(query);
            } catch {
                // Ignore errors
            }
        }

        // Send the updated list of ports to renderer
        BlueBox.mainWindow?.webContents.send("onRemoteSerialPorts", queryResults);
    }

    update() {
        this.updateAsync().catch(console.error);
    }
}