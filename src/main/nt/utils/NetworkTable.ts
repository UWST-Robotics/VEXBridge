import {EventEmitter} from "events";
import NTValue from "../../../types/nt/NTValue.ts";
import {startNewSession as _startNewSession} from "../../db/services/SessionInfoService.ts";
import {recordValueChange as _recordValueChange} from "../../db/services/ValueChangeService.ts";
import {setPathForKey as _setPathForKey} from "../../db/services/ValueKeyToPathService.ts";

export default class NetworkTables extends EventEmitter {
    currentSessionID: number | undefined;

    /**
     * Handles the network table DB operations.
     * Emits "new_session" when a new session is started.
     * Emits "value_changed" when a value is updated.
     * Emits "key_path_changed" when a key's path is updated.
     */
    constructor() {
        super();
        this.currentSessionID = undefined;
    }

    async startNewSession() {
        // Add session to the database
        this.currentSessionID = await _startNewSession();

        // Emit an event
        this.emit("new_session", this.currentSessionID);

        // Return the session ID
        return this.currentSessionID;
    }

    async updateValue(key: number, value: NTValue) {
        if (this.currentSessionID === undefined)
            this.currentSessionID = await this.startNewSession();

        // Record the value change in the database
        await _recordValueChange(this.currentSessionID, key, value);

        // Emit an event
        this.emit("value_changed", key, value);
    }

    async setPathForKey(key: number, path: string) {
        if (this.currentSessionID === undefined)
            this.currentSessionID = await this.startNewSession();

        // Record the value change in the database
        await _setPathForKey(this.currentSessionID, key, path);

        // Emit an event
        this.emit("key_path_changed", key, path);
    }
}