import {resetEvent} from "./EventService.ts";

/**
 * Service for handling reset events
 */
export class ResetService {
    /**
     * Called when the reset event is emitted
     */
    reset() {
        resetEvent.emit();
    }
}

const resetService = new ResetService();
export default resetService;