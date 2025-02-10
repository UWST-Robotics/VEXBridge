import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import {onReceive, UpdateValuePacket} from "./UpdateValuePacket.ts";

export const UpdateBoolPacketType: SerialPacketType<UpdateValuePacket<boolean>> = {
    typeID: SerialPacketTypeID.UPDATE_BOOL,
    serialize: (packet) => {
        const payload = Buffer.alloc(2 + 1);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeUInt8(packet.value ? 1 : 0, 2);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const value = packet.payload.readUInt8(2) !== 0;
        return {...packet, ntID, value};
    },
    onReceive
};