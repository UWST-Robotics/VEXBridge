import {SerialPort} from "serialport";
import {EventEmitter} from "events";
import {Duplex} from "stream";
import * as cobs from "cobs";

const KNOWN_PREFIXES = [
    "sout",  // Standard Output
    "serr",  // Standard Error
    "kdbg"   // Kernel Debug
];

export default class VEXSerialParser extends EventEmitter {
    cobsParser: Duplex;

    /**
     * Parse a COBS-encoded serial stream from a VEX V5 Brain.
     * Emits "sout", "serr", and "kdbg" events depending on the prefix of the incoming data.
     */
    constructor() {
        super();

        // Decode COBS Stream
        this.cobsParser = cobs.decodeStream();


        // Listen for data from COBS Parser
        this.cobsParser.on("data", (data: Buffer) => {
            const frameString = data.toString("utf8");

            // Parse prefix
            const prefix = KNOWN_PREFIXES.find(p => frameString.startsWith(p));

            // If prefix found, emit event
            if (prefix)
                this.emit(prefix, frameString.slice(prefix.length));

            // Otherwise, emit as "serr"
            else
                this.emit("serr", frameString);
        });
    }

    /**
     * Listen for data from a serial port
     * @param serialPort - The serial port to listen to
     */
    listenTo(serialPort: SerialPort) {
        // Pipe Serial Port to COBS Parser
        serialPort.pipe(this.cobsParser);
    }
}