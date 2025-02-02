import {SerialPort} from "serialport";
import parseSerialPacket from "./parseSerialPacket.ts";
import Logger from "../Logger.ts";

const PACKET_START = new Uint8Array([0xC9, 0x36, 0xB8, 0x47]);
const MAX_READ_BUFFER_SIZE = 1024;

export default class SerialPacketParser {
    /**
     * Listen for data from a serial port
     * @param serialPort - The serial port to listen to
     */
    listenTo(serialPort: SerialPort) {
        let readBuffer: Buffer = Buffer.alloc(0);
        Logger.info("Listening to serial port");

        // Listen for data from Serial
        serialPort.on("data", (data: Buffer) => {
            try {
                // Append data to buffer
                readBuffer = Buffer.concat([readBuffer, data]);

                // Check for packet start
                const startIndex = readBuffer.indexOf(PACKET_START);

                // Limit buffer size
                if (readBuffer.length > MAX_READ_BUFFER_SIZE) {
                    Logger.warn("Read buffer size exceeded maximum, discarding data");
                    readBuffer = Buffer.alloc(0);
                    return;
                }

                // Print hex data
                Logger.info(`Index: ${startIndex}, Data: ${readBuffer.toString("hex")}`);
                if (startIndex === -1)
                    return;

                // Discard any data before the start
                readBuffer = readBuffer.subarray(startIndex);

                // Parse packets
                parseSerialPacket(readBuffer);

            } catch (error) {
                const stack = error instanceof Error ? error.stack : "";
                Logger.error(`Error parsing serial packet: ${error}\n${stack}`);
            }

            // Discard parsed data
            readBuffer = Buffer.alloc(0);
        });
    }
}