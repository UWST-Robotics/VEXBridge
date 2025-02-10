import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import {onReceive, UpdateValuePacket} from "./UpdateValuePacket.ts";

export const UpdateDoublePacketType: SerialPacketType<UpdateValuePacket<number>> = {
    typeID: SerialPacketTypeID.UPDATE_DOUBLE,
    serialize: (packet) => {
        const payload = Buffer.alloc(2 + 8);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeDoubleBE(packet.value, 2);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const value = packet.payload.readDoubleBE(2);
        return {...packet, ntID, value};
    },
    onReceive
};