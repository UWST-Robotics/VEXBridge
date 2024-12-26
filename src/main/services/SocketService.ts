import {Server} from "socket.io";
import webService from "./WebService.ts";
import serialService from "./serial/SerialService.ts";
import logService from "./LogService.ts";
import ntService from "./NTService.ts";
import serialPollingService from "./serial/SerialPollingService.ts";

/**
 * Manages the socket connection to the server
 */
export class SocketService {
    private socketServer = new Server(webService.httpServer);

    init() {
        this.socketServer.on("connection", (socket) => {

            // Serial events
            serialService.onStateChange((state) => socket.emit("serial_state", state));
            serialPollingService.onListChange((list) => socket.emit("serial_list", list));

            // Log events
            logService.onLog((msg) => socket.emit("log", msg));

            // NT events
            ntService.onValueChange((key, value, timestamp) => socket.emit("value_changed", key, value, timestamp));
            ntService.onKeyPathChange((key, path) => socket.emit("key_path_changed", key, path));
        });
    }
}

const socketService = new SocketService();
export default socketService;