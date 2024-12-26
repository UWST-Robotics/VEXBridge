import NTValue from "../../types/nt/NTValue.ts";
import NTValueHistory from "../../types/nt/NTValueHistory.ts";
import {keyPathChangedEvent, resetEvent, valueChangedEvent} from "./EventService.ts";
import {MAX_VALUE_MEMORY} from "../common/Constants.ts";

/**
 * Manages NT values
 */
export class NTService {
    private db: NTValueHistory[] = [];

    constructor() {

        // Handle Reset Events
        resetEvent.on(() => {
            this.db = [];
        });
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
        keyPathChangedEvent.emit([key, path]);
    }

    /**
     * Updates the value of a key
     * @param key - The key to update
     * @param value - The new value
     */
    updateValue(key: number, value: NTValue) {

        // Get value history from DB
        const valueHistory = this.getValueHistory(key);
        const timestamp = Date.now(); // Elapsed milliseconds between start time and current time

        // Append value/timestamp to history
        valueHistory.values.push(value);
        valueHistory.timestamps.push(timestamp);

        // Trim history to `MAX_VALUE_MEMORY` entries
        if (valueHistory.values.length > MAX_VALUE_MEMORY) {
            valueHistory.values = valueHistory.values.slice(-MAX_VALUE_MEMORY);
            valueHistory.timestamps = valueHistory.timestamps.slice(-MAX_VALUE_MEMORY);
        }

        // Emit an event
        valueChangedEvent.emit([key, value, timestamp]);
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
                timestamps: [],
                latestValue: null,
            };
            this.db.push(valueHistory);
        }

        return valueHistory;
    }

    /**
     * Gets all the value keys
     */
    getAllValueKeys() {
        return this.db.map((valueHistory) => valueHistory.key);
    }
}

const ntService = new NTService();
export default ntService;