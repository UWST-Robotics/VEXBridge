/**
 * A class that represents a heartbeat.
 * It can be used to check if a connection is still alive.
 */
export default class Heartbeat {
    maxInterval: number;
    lastHeartbeat: number;
    timeoutHandle: NodeJS.Timeout | null = null;
    onDeath?: () => void;

    constructor(maxInterval: number, onDeath?: () => void) {
        this.maxInterval = maxInterval;
        this.lastHeartbeat = -1;
        this.onDeath = onDeath;
    }

    /**
     * Beat the heart.
     */
    beat() {
        this.lastHeartbeat = Date.now();

        if (this.timeoutHandle !== null) {
            clearTimeout(this.timeoutHandle);
        }

        this.timeoutHandle = setTimeout(() => {
            if (this.isDead() && this.onDeath)
                this.onDeath();
        }, this.maxInterval);
    }

    /**
     * Check if the connection is dead.
     * @returns {boolean} True if the connection is dead.
     */
    isDead() {
        return Date.now() - this.lastHeartbeat > this.maxInterval;
    }
}