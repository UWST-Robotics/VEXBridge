import {logEvent, resetEvent} from "./EventService.ts";

/**
 * Manages log messages relayed to the client
 */
export class LogService {
    private fullLogTest = "\x1b[90m --- start of log --- \x1b[0m\n";

    constructor() {
        // Handle Reset Events
        resetEvent.on(() => {
            this.log("\x1b[90m --- reset --- \x1b[0m\n");
        });
    }

    /**
     * Adds a log message
     * @param message - Message to append to log
     */
    log(message: string) {
        this.fullLogTest += message;
        logEvent.emit("log", message);
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