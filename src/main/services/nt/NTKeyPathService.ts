import {EventEmitter} from "events";
import sessionService from "../SessionService.ts";
import ValueKeyToPathModel from "../../db/models/ValueKeyToPathModel.ts";

/**
 * Manages key paths
 */
export class NTKeyPathService {
    private eventEmitter = new EventEmitter();

    /**
     * Updates the path for a key
     * @param key - The key to update
     * @param path - The new path
     */
    async setPathForKey(key: number, path: string) {
        // Get the active session
        const activeSession = await sessionService.getActiveSession();
        if (activeSession === null)
            return;
        const {sessionID} = activeSession;

        // Find the existing entry
        const existing = await ValueKeyToPathModel.findOne({where: {sessionID: sessionID, key: key}});

        if (existing)
            // Update the path if it already exists
            await existing.update({path: path});
        else
            // Otherwise, create a new entry
            await ValueKeyToPathModel.create({
                sessionID: sessionID,
                key: key,
                path: path
            });

        // Emit an event
        this.eventEmitter.emit("key_path_changed", sessionID, key, path);
    }

    /**
     * Called when a key's path is updated
     * @param callback - The callback to call when a key's path is updated
     */
    onKeyPathChange(callback: (sessionID: number, key: number, path: string) => void) {
        this.eventEmitter.on("key_path_changed", callback);
    }

    /**
     * Gets all the keys and paths for a session
     * @param sessionID - The session ID to get the keys and paths for
     * @returns All the keys and paths for the session
     */
    async getAllKeyPaths(sessionID: number) {
        return await ValueKeyToPathModel.findAll({where: {sessionID: sessionID}});
    }
}

const ntKeyPathService = new NTKeyPathService();
export default ntKeyPathService;