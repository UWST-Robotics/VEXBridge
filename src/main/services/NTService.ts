import NTValue from "../../types/nt/NTValue.ts";
import {keyPathChangedEvent, resetEvent, valueChangedEvent} from "../common/EventHandler.ts";
import NTValueInfo from "../../types/nt/NTValueInfo.ts";

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
     * Searches for a key by path
     * @param path - The path to search for
     */
    getKeyForPath(path: string): number | undefined {
        const keys = Object.keys(this.pathDB);
        for (const key of keys) {
            if (this.pathDB[Number(key)] === path)
                return Number(key);
        }
        return undefined;
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
    getAllValues(): NTValueInfo[] {
        const labeledIDs = Object.keys(this.valueDB);

        return labeledIDs.map((key) => {
            const keyNumber = Number(key);
            return {
                key: keyNumber,
                label: this.pathDB[keyNumber],
                value: this.valueDB[keyNumber],
            };
        });
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