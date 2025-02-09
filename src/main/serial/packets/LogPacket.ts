import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import Logger from "../../common/Logger.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";

export interface LogPacket extends SerialPacket {
    message: string;
}

export const LogPacketType: SerialPacketType<LogPacket> = {
    typeID: SerialPacketTypeID.LOG,
    serialize: (packet) => {
        let messageLength = Buffer.byteLength(packet.message);

        // Limit the message length to 65535 bytes
        if (messageLength > 0xFFFF)
            messageLength = 0xFFFF;

        const payload = Buffer.alloc(2 + messageLength);
        payload.writeUInt16BE(messageLength, 0);
        payload.write(packet.message, 2, messageLength, "utf8");
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const messageLength = packet.payload.readUInt16BE(0);
        const message = packet.payload.toString("utf8", 2, 2 + messageLength);
        return {...packet, message};
    },
    onReceive: (packet) => {
        Logger.log(packet.message);
        sendAckPacket(packet.id);
    },
};