import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import Logger from "../../common/Logger.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";

export interface PingPacket extends SerialPacket {
    timestamp: number;
}

export const PingPacketType: SerialPacketType<PingPacket> = {
    typeID: SerialPacketTypeID.PING,
    serialize: (packet) => {
        const payload = Buffer.alloc(4);
        payload.writeUInt32BE(packet.timestamp, 0);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const timestamp = packet.payload.readUInt32BE(0);
        return {...packet, timestamp};
    },
    onReceive: (packet) => {
        Logger.info(`Ping received: ${packet.timestamp}`);
        sendAckPacket(packet.id);
    },
};