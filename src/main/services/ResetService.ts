import {resetEvent} from "../common/EventHandler.ts";

/**
 * Service for handling reset events
 */
export class ResetService {
    resetTime = Date.now();

    /**
     * Gets the milliseconds since the last reset
     * @returns The milliseconds since the last reset
     */
    getTimestamp(): number {
        return Date.now() - this.resetTime;
    }

    /**
     * Called when the reset event is emitted
     */
    reset() {
        this.resetTime = Date.now();
        resetEvent.emit();
    }
}

const resetService = new ResetService();
export default resetService;