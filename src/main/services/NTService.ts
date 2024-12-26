import NTValue from "../../types/nt/NTValue.ts";
import {keyPathChangedEvent, resetEvent, valueChangedEvent} from "../common/EventHandler.ts";

/**
 * Manages NT values
 */
export class NTService {
    private valueDB: Record<number, NTValue> = {};
    private pathDB: Record<number, string> = {};

    constructor() {

        // Handle Reset Events
        resetEvent.on(() => {
            this.valueDB = {};
            this.pathDB = {};
        });
    }

    /**
     * Updates the path for a key
     * @param key - The key to update
     * @param path - The new path
     */
    setPathForKey(key: number, path: string) {

        // Update path
        this.pathDB[key] = path;

        // Emit an event
        keyPathChangedEvent.emit([key, path]);
    }

    /**
     * Updates the value of a key
     * @param key - The key to update
     * @param value - The new value
     */
    updateValue(key: number, value: NTValue) {

        // Update value
        this.valueDB[key] = value;

        // Emit an event
        valueChangedEvent.emit([key, value]);
    }

    /**
     * Gets an NT record for a given key
     * @returns The NT record
     */
    getAllValues(): Record<number, NTValue> {
        return this.valueDB;
    }

    /**
     * Gets all key-path pairs
     * @returns The key-path pairs
     */
    getAllPaths(): Record<number, string> {
        return this.pathDB;
    }
}

const ntService = new NTService();
export default ntService;