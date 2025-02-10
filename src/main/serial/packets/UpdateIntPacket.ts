import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import {onReceive, UpdateValuePacket} from "./UpdateValuePacket.ts";

export const UpdateIntPacketType: SerialPacketType<UpdateValuePacket<number>> = {
    typeID: SerialPacketTypeID.UPDATE_INT,
    serialize: (packet) => {
        const payload = Buffer.alloc(2 + 2);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeInt16BE(packet.value, 2);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const value = packet.payload.readInt16BE(2);
        return {...packet, ntID, value};
    },
    onReceive
};