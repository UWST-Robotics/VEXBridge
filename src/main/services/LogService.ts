import {EventEmitter} from "events";

/**
 * Manages log messages relayed to the client
 */
export class LogService {
    private eventEmitter = new EventEmitter();
    private fullLogTest = "";

    /**
     * Adds a log message
     * @param message - Message to append to log
     */
    log(message: string) {
        this.fullLogTest += message;
        this.eventEmitter.emit("log", message);
    }

    /**
     * Listens for log events and fires the callback
     * @param callback - Callback for log messages
     */
    onLog(callback: (message: string) => void) {
        this.eventEmitter.on("log", callback);
    }

    /**
     * Gets the full log as a string
     */
    getCurrentLog() {
        return this.fullLogTest;
    }
}

const logService = new LogService();
export default logService;