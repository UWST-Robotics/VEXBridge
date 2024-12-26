import {EventEmitter} from "events";
import SerialState from "../../types/serial/SerialState.ts";
import VEXSerialPortInfo from "../../types/serial/VEXSerialPortInfo.ts";
import NTValue from "../../types/nt/NTValue.ts";

/**
 * Generic event handler
 */
export class EventHandler<T> {
    eventEmitter = new EventEmitter();

    emit(...args: T[]) {
        this.eventEmitter.emit("event", ...args);
    }

    on(callback: (...args: T[]) => void) {
        this.eventEmitter.on("event", callback);
    }

    off(callback: (...args: T[]) => void) {
        this.eventEmitter.off("event", callback);
    }
}

// Global events
export const resetEvent = new EventHandler<void>();
export const logEvent = new EventHandler<string>();
export const serialStateEvent = new EventHandler<SerialState>();
export const serialListEvent = new EventHandler<VEXSerialPortInfo[]>();
export const valueChangedEvent = new EventHandler<[number, NTValue]>(); // key, value
export const keyPathChangedEvent = new EventHandler<[number, string]>(); // key, path