import {logEvent, resetEvent} from "../common/EventHandler.ts";

const MAX_LOG_MEMORY = 100 * 1024; // 100 KB
const DEFAULT_LOG_TEXT = "\x1b[90m --- start of log --- \x1b[0m\n";

/**
 * Manages log messages relayed to the client
 */
export class LogService {
    private fullLogText = DEFAULT_LOG_TEXT;

    constructor() {
        // Handle Reset Events
        resetEvent.on(() => {
            this.fullLogText = "";
            this.log(DEFAULT_LOG_TEXT);
        });
    }

    /**
     * Adds a log message
     * @param message - Message to append to log
     */
    log(message: string) {
        this.fullLogText += message;
        if (this.fullLogText.length > MAX_LOG_MEMORY)
            this.fullLogText = this.fullLogText.slice(-MAX_LOG_MEMORY);
        logEvent.emit(message);
    }

    /**
     * Gets the full log as a string
     */
    getCurrentLog() {
        return this.fullLogText;
    }
}

const logService = new LogService();
export default logService;