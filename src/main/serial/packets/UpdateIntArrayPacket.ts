import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import {onReceive, UpdateValuePacket} from "./UpdateValuePacket.ts";

export const UpdateIntArrayPacketType: SerialPacketType<UpdateValuePacket<number[]>> = {
    typeID: SerialPacketTypeID.UPDATE_INT_ARRAY,
    serialize: (packet) => {
        const payload = Buffer.alloc(4 + 2 * packet.value.length);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeUInt16BE(packet.value.length, 2);
        for (let i = 0; i < packet.value.length; i++)
            payload.writeInt16BE(packet.value[i], 4 + 2 * i);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const length = packet.payload.readUInt16BE(2);
        const value = [];
        for (let i = 0; i < length; i++)
            value.push(packet.payload.readInt16BE(4 + 2 * i));
        return {...packet, ntID, value};
    },
    onReceive
};