import {SerialPort} from "serialport";
import parseSerialPacket from "./parseSerialPacket.ts";
import {END_FLAG, ESCAPE_FLAG} from "../../types/serial/SerialFlags.ts";
import logger from "../common/Logger.ts";

const MAX_READ_BUFFER_SIZE = 100 * 1024; // 100 KB

export default class SerialPacketParser {
    readBuffer: Buffer = Buffer.alloc(0);

    /**
     * Listen for data from a serial port
     * @param serialPort - The serial port to listen to
     */
    listenTo(serialPort: SerialPort) {
        // Log
        logger.verbose(`Listening to serial @ ${serialPort.path}`);

        // Listen for data from Serial
        serialPort.on("data", this.onData.bind(this));
    }

    /**
     * Called on data event from serial port.
     * Appends data to buffer and parses packets.
     * @param data - The data received
     */
    private onData(data: Buffer) {
        try {
            // Log
            logger.debug(`Received data: ${data.toString("hex")}`);

            // Append data to buffer
            this.readBuffer = Buffer.concat([this.readBuffer, data]);
            logger.debug(`Read buffer: ${this.readBuffer.toString("hex")}`);

            // Limit buffer size
            if (this.readBuffer.length > MAX_READ_BUFFER_SIZE) {
                logger.warn("Read buffer size exceeded maximum, discarding data");
                this.readBuffer = Buffer.alloc(0);
                return;
            }

            // Iterate over buffer
            for (let i = 0; i < this.readBuffer.length; i++) {
                // Check ESCAPE_FLAG
                if (this.readBuffer[i] === ESCAPE_FLAG) {
                    // Skip next byte
                    i++;
                    continue;
                }

                // If END_FLAG, parse packet
                if (this.readBuffer[i] !== END_FLAG)
                    continue;

                // Minimum 2 bytes for packet
                if (i < 1)
                    continue;

                // Split the buffer at the delimiter
                const packetBuffer = this.readBuffer.subarray(0, i); // Before delimiter
                this.readBuffer = this.readBuffer.subarray(i + 1); // After delimiter
                i = -1; // Reset index

                // Parse packets
                parseSerialPacket(packetBuffer);
            }
        } catch (error) {
            const stack = error instanceof Error ? error.stack : "";
            logger.error(`Error parsing serial packet: ${error}\n${stack}`);

            // Send NACK
            // sendNackPacket();
        }
    }
}