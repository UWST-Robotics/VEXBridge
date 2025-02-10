import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";
import logService from "../../services/LogService.ts";

export interface LogPacket extends SerialPacket {
    message: string;
}

export const LogPacketType: SerialPacketType<LogPacket> = {
    typeID: SerialPacketTypeID.LOG,
    serialize: (packet) => {
        // Limit the message length to 2 bytes
        const length = Math.min(Buffer.byteLength(packet.message), 0xFFFF);

        const payload = Buffer.alloc(2 + length);
        payload.writeUInt16BE(length, 0);
        payload.write(packet.message, 2, length, "utf8");
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const length = packet.payload.readUInt16BE(0);
        const message = packet.payload.toString("utf8", 2, 2 + length);
        return {...packet, message};
    },
    onReceive: (packet) => {
        logService.log(packet.message);
        sendAckPacket(packet.id);
    },
};