import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";

export interface GenericAckPacket extends SerialPacket {
    targetID: number;
}

export const GenericAckPacketType: SerialPacketType<GenericAckPacket> = {
    typeID: SerialPacketTypeID.GENERIC_ACK,
    serialize: (packet) => {
        const payload = Buffer.alloc(1);
        payload.writeUInt8(packet.targetID, 0);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const targetID = packet.payload.readUInt8(0);
        return {...packet, targetID};
    },
    onReceive: () => {
        // Do nothing
    },
};