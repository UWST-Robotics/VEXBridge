import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import {onReceive, UpdateValuePacket} from "./UpdateValuePacket.ts";

export const UpdateStringPacketType: SerialPacketType<UpdateValuePacket<string>> = {
    typeID: SerialPacketTypeID.UPDATE_STRING,
    serialize: (packet) => {
        // The length of the string is limited to 253 bytes to fit the entire payload size in 1 byte
        const length = Math.min(Buffer.byteLength(packet.value), 0xFF - 3);

        const payload = Buffer.alloc(3 + length);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeInt8(length, 2);
        payload.write(packet.value, 3, length, "utf8");
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const length = packet.payload.readUInt8(2);
        const value = packet.payload.toString("utf8", 3, 3 + length);
        return {...packet, ntID, value};
    },
    onReceive
};