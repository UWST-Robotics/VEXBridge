import NTValue from "../../../types/nt/NTValue.ts";
import ValueChangeModel from "../../db/models/ValueChangeModel.ts";
import {EventEmitter} from "events";
import sessionService from "../SessionService.ts";

/**
 * Manages NT values
 */
export class NTValueService {
    private eventEmitter = new EventEmitter();

    /**
     * Updates the value of a key
     * @param key - The key to update
     * @param value - The new value
     */
    async updateValue(key: number, value: NTValue) {
        // Get the active session
        const activeSession = await sessionService.getActiveSession();
        if (activeSession === null)
            return;
        const {sessionID} = activeSession;

        // Record the value change in the database
        await ValueChangeModel.create({
            sessionID,
            timestamp: new Date(),
            key: key,
            newValue: value
        });

        // Emit an event
        this.eventEmitter.emit("value_changed", sessionID, key, value);
    }

    /**
     * Called when a value is updated
     * @param callback - The callback to call when a value is updated
     */
    onValueChange(callback: (sessionID: number, key: number, value: NTValue) => void) {
        this.eventEmitter.on("value_changed", callback);
    }

    /**
     * Gets the history of values for a key
     * @param sessionID - The session ID to get the history for
     * @param key - The key to get the history for
     * @returns The history of values for the key
     */
    async getValueHistory(sessionID: number, key: number) {
        return await ValueChangeModel.findAll(
            {
                where: {sessionID: sessionID, key: key},
                order: [["timestamp", "DESC"]]
            });
    }
}

const ntValueService = new NTValueService();
export default ntValueService;