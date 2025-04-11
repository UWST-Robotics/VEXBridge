import NTValue from "../../types/nt/NTValue.ts";
import {resetEvent} from "../common/EventHandler.ts";

export interface ValueUpdateQueueItem {
    key: number;
    value: NTValue;
}

/**
 * Queue of values that need to be written to the serial port
 */
export class ValueUpdateQueueService {
    private valueUpdateQueue: ValueUpdateQueueItem[] = [];

    constructor() {

        // Handle Reset Events
        resetEvent.on(() => {
            this.valueUpdateQueue = [];
        });
    }

    /**
     * Updates the value of a key
     * @param key - The key to update
     * @param value - The new value
     */
    updateValue(key: number, value: NTValue) {

        // Update value
        this.valueUpdateQueue.push({key, value});
    }

    /**
     * Pops a value from the queue
     * @returns The value from the queue
     */
    popValueFromQueue(): ValueUpdateQueueItem | undefined {
        return this.valueUpdateQueue.shift();
    }
}

const valueUpdateQueueService = new ValueUpdateQueueService();
export default valueUpdateQueueService;