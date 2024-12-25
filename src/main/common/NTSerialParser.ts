import Logger from "./Logger.ts";
import sessionService from "../services/SessionService.ts";
import ntValueService from "../services/nt/NTValueService.ts";
import serialService from "../services/serial/SerialService.ts";
import ntKeyPathService from "../services/nt/NTKeyPathService.ts";
import logService from "../services/LogService.ts";

export default class NTSerialParser {
    onData(data: string) {
        // String to buffer
        const buffer = Buffer.from(data, "utf-8");

        // Parse command
        const command = buffer.readUInt8(0);

        if (command === 0x01) {

            // Start new session
            sessionService.startSession().catch(this.onError);

            // Ack
            this.writeAck();

        } else if (command === 0x02) {

            // Update integer value
            const key = buffer.readUInt16LE(1);
            const value = buffer.readInt32LE(3);

            ntValueService.updateValue(key, value).catch(this.onError);

            // Ack
            this.writeAck();

        } else if (command === 0x03) {

            // Update string value
            const key = buffer.readUInt16LE(1);
            const valueLength = buffer.readUInt16LE(3);
            const value = buffer.toString("utf-8", 5, 5 + valueLength);

            ntValueService.updateValue(key, value).catch(this.onError);

            // Ack
            this.writeAck();

        } else if (command === 0x04) {

            // Update double value
            const key = buffer.readUInt16LE(1);
            const value = buffer.readDoubleLE(3);

            ntValueService.updateValue(key, value).catch(this.onError);

            // Ack
            this.writeAck();

        } else if (command === 0x05) {

            // Update boolean value
            const key = buffer.readUInt16LE(1);
            const value = buffer.readUInt8(3) === 1;

            ntValueService.updateValue(key, value).catch(this.onError);

            // Ack
            this.writeAck();

        } else if (command === 0x10) {

            // Update key path
            const key = buffer.readUInt16LE(1);
            const pathLength = buffer.readUInt16LE(3);
            const path = buffer.toString("utf-8", 5, 5 + pathLength);

            ntKeyPathService.setPathForKey(key, path).catch(this.onError);

            // Ack
            this.writeAck();

        } else {

            // Assume it's a log message
            logService.log(data);
        }
    }

    private onError(error: Error) {
        Logger.error(`NT serial parser error: ${error.message}`);
    }

    private writeAck() {
        const ackBuffer = Buffer.alloc(1);
        ackBuffer.writeUInt8(0x01, 0);
        serialService.write(ackBuffer).catch(this.onError);
    }
}