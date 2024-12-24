import {Server} from "socket.io";
import {httpServer} from "../api/localExpressApp.ts";
import localSerialInstance from "../serial/localSerialInstance.ts";
import localNetworkTables from "../nt/localNetworkTables.ts";

const localSocketServer = new Server(httpServer);
export default localSocketServer;

/**
 * Socket server used to listen to events from the serial and network tables.
 */
export function initSocketServer() {
    localSocketServer.on("connection", (socket) => {

        // Serial events
        localSerialInstance.on("serial_state", (state) => socket.emit("serial_state", state));
        localSerialInstance.on("serial_list", (state) => socket.emit("serial_list", state));
        localSerialInstance.on("serial_log", (msg) => socket.emit("serial_log", msg));

        // NT events
        localNetworkTables.on("new_session", (sessionID) => socket.emit("new_session", sessionID));
        localNetworkTables.on("value_changed", (key, value) => socket.emit("value_changed", key, value));
        localNetworkTables.on("key_path_changed", (key, path) => socket.emit("key_path_changed", key, path));
    });
}