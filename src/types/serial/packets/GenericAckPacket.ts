import EncodedSerialPacket from "../EncodedSerialPacket.ts";
import SerialPacketTypeID from "../SerialPacketTypeID.ts";
import SerialPacketType from "../SerialPacketType.ts";
import SerialPacket from "../SerialPacket.ts";

type GenericAckPacket = SerialPacket;
export default GenericAckPacket;

export const GenericAckPacketType: SerialPacketType<GenericAckPacket> = {
    typeID: SerialPacketTypeID.GENERIC_ACK,
    serialize: (packet: GenericAckPacket) => {
        return {
            ...packet,
            payload: Buffer.alloc(0)
        };
    },
    onReceive: (_: EncodedSerialPacket) => {
        throw new Error("GenericAckPacket should not be received");
    }
};