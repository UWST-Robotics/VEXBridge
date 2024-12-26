import NTValue from "../../types/nt/NTValue.ts";
import {EventEmitter} from "events";
import NTValueHistory from "../../types/nt/NTValueHistory.ts";

/**
 * Manages NT values
 */
export class NTService {
    private eventEmitter = new EventEmitter();
    private db: NTValueHistory[] = [];
    private startTime = 0;

    /**
     * Resets DB to initial state and marks the start time
     */
    reset() {
        this.db = [];
        this.startTime = Date.now();
    }

    /**
     * Updates the path for a key
     * @param key - The key to update
     * @param path - The new path
     */
    setPathForKey(key: number, path: string) {
        // Get value history from DB
        const valueHistory = this.getValueHistory(key);

        // Update path
        valueHistory.path = path;

        // Emit an event
        this.eventEmitter.emit("key_path_changed", key, path);
    }


    /**
     * Updates the value of a key
     * @param key - The key to update
     * @param value - The new value
     */
    updateValue(key: number, value: NTValue) {

        // Get value history from DB
        const valueHistory = this.getValueHistory(key);
        const timestamp = Date.now() - this.startTime; // Elapsed milliseconds between start time and current time

        // Append value/timestamp to history
        valueHistory.values.push(value);
        valueHistory.timestamps.push(timestamp);

        // Emit an event
        this.eventEmitter.emit("value_changed", key, value, timestamp);
    }

    /**
     * Called when a value is updated
     * @param callback - The callback to call when a value is updated
     */
    onValueChange(callback: (key: number, value: NTValue, timestamp: number) => void) {
        this.eventEmitter.on("value_changed", callback);
    }

    /**
     * Called when a key's path is updated
     * @param callback - The callback to call when a key's path is updated
     */
    onKeyPathChange(callback: (key: number, path: string) => void) {
        this.eventEmitter.on("key_path_changed", callback);
    }

    /**
     * Gets the history of values for a key
     * @param key - The key to get the history for
     * @returns The history of values for the key
     */
    getValueHistory(key: number): NTValueHistory {
        // Find the value history for the key
        let valueHistory = this.db.find((valueHistory) => valueHistory.key === key);

        // If not found, create a new value history
        if (!valueHistory) {
            valueHistory = {
                key: key,
                values: [],
                timestamps: []
            };
            this.db.push(valueHistory);
        }

        return valueHistory;
    }

    /**
     * Gets all the value histories for a session
     */
    getAllValueHistories() {
        return this.db;
    }
}

const ntService = new NTService();
export default ntService;