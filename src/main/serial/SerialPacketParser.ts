import {SerialPort} from "serialport";
import parseSerialPacket from "./parseSerialPacket.ts";
import Logger from "../common/Logger.ts";

const PACKET_HEADER = new Uint8Array([0xC9, 0x36, 0xB8, 0x47]);
const MAX_READ_BUFFER_SIZE = 1024;

export default class SerialPacketParser {
    readBuffer: Buffer = Buffer.alloc(0);

    /**
     * Listen for data from a serial port
     * @param serialPort - The serial port to listen to
     */
    listenTo(serialPort: SerialPort) {
        // Log
        Logger.info(`Listening to serial port: ${serialPort.path}`);

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
            // Append data to buffer
            this.readBuffer = Buffer.concat([this.readBuffer, data]);

            // Limit buffer size
            if (this.readBuffer.length > MAX_READ_BUFFER_SIZE) {
                Logger.warn("Read buffer size exceeded maximum, discarding data");
                this.readBuffer = Buffer.alloc(0);
                return;
            }

            // Check for packet header
            const startIndex = this.readBuffer.indexOf(PACKET_HEADER);
            if (startIndex === -1)
                return;

            // Discard any data before the header
            this.readBuffer = this.readBuffer.subarray(startIndex);

            // Parse packets
            parseSerialPacket(this.readBuffer);

            // Discard buffer
            this.readBuffer = Buffer.alloc(0);

        } catch (error) {
            const stack = error instanceof Error ? error.stack : "";
            Logger.error(`Error parsing serial packet: ${error}\n${stack}`);
        }
    }
}