import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";

export type PingPacket = SerialPacket

export const PingPacketType: SerialPacketType<PingPacket> = {
    typeID: SerialPacketTypeID.PING,
    serialize: (packet) => {
        const payload = Buffer.alloc(0);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        return {...packet};
    },
    onReceive: (packet) => {
        sendAckPacket(packet.id);
    },
};