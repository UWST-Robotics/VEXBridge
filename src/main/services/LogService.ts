import {logEvent, resetEvent} from "../common/EventHandler.ts";
import {MAX_LOG_MEMORY} from "../common/Constants.ts";

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
        if (this.fullLogTest.length > MAX_LOG_MEMORY)
            this.fullLogTest = this.fullLogTest.slice(-MAX_LOG_MEMORY);
        logEvent.emit(message);
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