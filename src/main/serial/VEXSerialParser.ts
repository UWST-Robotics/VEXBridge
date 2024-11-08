import {SerialPort} from "serialport";
import {DelimiterParser} from "@serialport/parser-delimiter";

export default class VEXSerialParser {
    delimiterParser: DelimiterParser;

    constructor(serialPort: SerialPort, onData: (data: string) => void) {

        // Wait for "sout" delimiter
        this.delimiterParser = serialPort.pipe(new DelimiterParser({delimiter: "sout"}));

        // Remove Null Byte
        this.delimiterParser.on("data", (data) => {
            // Find index of null byte
            const nullByteIndex = data.indexOf(0);

            // Slice data to remove null byte
            if (nullByteIndex !== -1)
                data = data.slice(0, nullByteIndex);

            // Convert to a string using TextDecoder
            const decoder = new TextDecoder();
            onData(decoder.decode(data));
        });
    }
}