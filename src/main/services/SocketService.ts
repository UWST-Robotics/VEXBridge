import {Server} from "socket.io";
import webService from "./WebService.ts";
import serialService from "./serial/SerialService.ts";
import logService from "./LogService.ts";
import ntValueService from "./nt/NTValueService.ts";
import sessionService from "./SessionService.ts";
import serialPollingService from "./serial/SerialPollingService.ts";
import ntKeyPathService from "./nt/NTKeyPathService.ts";

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
            logService.onLog((msg) => socket.emit("serial_log", msg));

            // NT events
            sessionService.onSessionStarted((sessionInfo) => socket.emit("new_session", sessionInfo));
            ntValueService.onValueChange((sessionID, key, value) => socket.emit("value_changed", sessionID, key, value));
            ntKeyPathService.onKeyPathChange((sessionID, key, path) => socket.emit("key_path_changed", sessionID, key, path));
        });
    }
}

const socketService = new SocketService();
export default socketService;