import {EventEmitter} from "events";

/**
 * Manages log messages relayed to the client
 */
export class LogService {
    private eventEmitter = new EventEmitter();

    log(message: string) {
        this.eventEmitter.emit("log", message);
    }

    onLog(callback: (message: string) => void) {
        this.eventEmitter.on("log", callback);
    }
}

const logService = new LogService();
export default logService;