import {EventEmitter} from "events";
import SessionInfoModel from "../db/models/SessionInfoModel.ts";
import SessionInfo from "../../types/db/SessionInfo.ts";

// TODO: Remove old session info

/**
 * Handles data collection and storage sessions
 */
export class SessionService {
    private eventEmitter = new EventEmitter();
    private activeSession: SessionInfo | null = null;

    /**
     * Start a new session
     */
    async startSession() {
        // Add to DB
        const session = await SessionInfoModel.create({
            startTimestamp: new Date(),
            label: ""
        });

        // Set as active
        this.activeSession = session;

        // Emit event
        this.eventEmitter.emit("session-started", session);
        return session;
    }

    /**
     * Gets the active session
     * @returns The active session
     */
    async getActiveSession() {
        return this.activeSession;
    }

    /**
     * Called when a session is started
     * @param callback - The callback to call when a session is started
     */
    onSessionStarted(callback: (sessionInfo: SessionInfo) => void) {
        this.eventEmitter.on("session-started", callback);
    }

    /**
     * Gets all session infos
     * @returns All session infos
     */
    async getAllSessionInfos() {
        return await SessionInfoModel.findAll();
    }

    /**
     * Gets a session info by ID
     * @param sessionID - The session ID
     * @returns The session info
     */
    async getSessionInfo(sessionID: number) {
        return await SessionInfoModel.findByPk(sessionID);
    }
}

const localSessionService = new SessionService();
export default localSessionService;