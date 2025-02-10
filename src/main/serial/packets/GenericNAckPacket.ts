import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";

export type GenericNAckPacket = SerialPacket

export const GenericNAckPacketType: SerialPacketType<GenericNAckPacket> = {
    typeID: SerialPacketTypeID.GENERIC_NACK,
    serialize: (packet) => {
        const payload = Buffer.alloc(0);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        return {...packet};
    },
    onReceive: () => {
        throw new Error("GenericNAckPacket should not be received");
    },
};