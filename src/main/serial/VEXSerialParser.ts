import {SerialPort} from "serialport";
import {EventEmitter} from "events";
import {Duplex} from "stream";
import * as cobs from "cobs";

const KNOWN_PREFIXES = [
    "sout",
    "serr",
    "kdbg"
];

export default class VEXSerialParser extends EventEmitter {
    cobsParser: Duplex;

    constructor(serialPort: SerialPort) {
        super();

        this.cobsParser = cobs.decodeStream();

        serialPort.on("data", (data: Buffer) => {
            this.cobsParser.write(data);
        });

        this.cobsParser.on("data", (data: Buffer) => {
            const frameString = data.toString("utf8");
            const prefix = KNOWN_PREFIXES.find(p => frameString.startsWith(p));
            if (prefix)
                this.emit(prefix, frameString.slice(prefix.length));
            else
                this.emit("serr", frameString);
        });
    }
}