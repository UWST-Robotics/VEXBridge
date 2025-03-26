import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import {onReceive, UpdateValuePacket} from "./UpdateValuePacket.ts";

export const UpdateFloatArrayPacketType: SerialPacketType<UpdateValuePacket<number[]>> = {
    typeID: SerialPacketTypeID.UPDATE_FLOAT_ARRAY,
    serialize: (packet) => {
        const payload = Buffer.alloc(4 + 4 * packet.value.length);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeUInt16BE(packet.value.length, 2);
        for (let i = 0; i < packet.value.length; i++)
            payload.writeFloatBE(packet.value[i], 4 + 4 * i);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const length = packet.payload.readUInt16BE(2);
        const value = [];
        for (let i = 0; i < length; i++)
            value.push(packet.payload.readFloatBE(4 + 4 * i));
        return {...packet, ntID, value};
    },
    onReceive
};