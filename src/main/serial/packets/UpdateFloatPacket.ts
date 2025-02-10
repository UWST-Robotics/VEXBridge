import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import {onReceive, UpdateValuePacket} from "./UpdateValuePacket.ts";

export const UpdateFloatPacketType: SerialPacketType<UpdateValuePacket<number>> = {
    typeID: SerialPacketTypeID.UPDATE_FLOAT,
    serialize: (packet) => {
        const payload = Buffer.alloc(2 + 4);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeFloatBE(packet.value, 2);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const value = packet.payload.readFloatBE(2);
        return {...packet, ntID, value};
    },
    onReceive
};