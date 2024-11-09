import {Transform, TransformCallback} from "stream";
import * as cobs from "cobs";
import Logger from "../common/Logger.ts";

const KNOWN_PREFIXES = [
    "sout",
    "serr",
    "kdbg"
];

export default class VEXSerialParser extends Transform {
    private buffer = Buffer.alloc(0);

    _transform(chunk: Buffer, _: BufferEncoding, cb: TransformCallback) {

        // Concatenate the buffer with the new chunk
        let data = Buffer.concat([this.buffer, chunk]);

        // Find null byte
        const nullByteIndex = data.indexOf(0);

        // Split the buffer at the null byte
        const frame = data.slice(0, nullByteIndex);
        data = data.slice(nullByteIndex + 1);

        // Parse COBS
        const decoded = cobs.decode(frame);

        // Check for known prefixes
        const frameString = decoded.toString("utf8");
        const prefix = KNOWN_PREFIXES.find(p => frameString.startsWith(p));
        if (prefix)
            this.emit(prefix, frameString.slice(prefix.length));
        else
            Logger.error(`Unknown serial frame: ${frameString}`);

        this.buffer = data;
        cb();
    }

    _flush(cb: TransformCallback) {
        this.push(this.buffer);
        this.buffer = Buffer.alloc(0);
        cb();
    }
}