import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";

export type GenericAckPacket = SerialPacket

export const GenericAckPacketType: SerialPacketType<GenericAckPacket> = {
    typeID: SerialPacketTypeID.GENERIC_ACK,
    serialize: (packet) => {
        const payload = Buffer.alloc(0);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        return {...packet};
    },
    onReceive: () => {
        throw new Error("GenericAckPacket should not be received");
    },
};