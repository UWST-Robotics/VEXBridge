import {Server} from "socket.io";
import webService from "./WebService.ts";
import {
    keyPathChangedEvent,
    logEvent,
    resetEvent,
    serialListEvent,
    serialStateEvent,
    valueChangedEvent
} from "./EventService.ts";
import Logger from "../common/Logger.ts";

/**
 * Manages the socket connection to the server
 */
export class SocketService {
    private socketServer = new Server(webService.httpServer);

    init() {
        // Connect Event Listeners
        resetEvent.on(() => this.socketServer.emit("reset"));
        serialStateEvent.on((state) => this.socketServer.emit("serial_state", state));
        serialListEvent.on((list) => this.socketServer.emit("serial_list", list));
        logEvent.on((msg) => this.socketServer.emit("log", msg));
        valueChangedEvent.on((payload) => this.socketServer.emit("value_changed", payload));
        keyPathChangedEvent.on((payload) => this.socketServer.emit("key_path_changed", payload));

        this.socketServer.on("connection", (socket) => {

            // Log Connection
            Logger.info(`Client connected: ${socket.id}`);

            socket.on("disconnect", () => {

                // Log Disconnection
                Logger.info(`Client disconnected: ${socket.id}`);
            });
        });
    }
}

const socketService = new SocketService();
export default socketService;