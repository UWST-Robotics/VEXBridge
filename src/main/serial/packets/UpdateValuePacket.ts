import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import ntService from "../../services/NTService.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";

// Types of values that can be updated
export enum UpdateValueType {
    BOOL = 1,
    INT = 2,
    DOUBLE = 3,
}

// Size of each value type in bytes
export const UpdateValueTypeSize = {
    [UpdateValueType.BOOL]: 1,
    [UpdateValueType.INT]: 2,
    [UpdateValueType.DOUBLE]: 4,
};

export interface UpdateValuePacket extends SerialPacket {
    ntID: number;
    timestamp: number;
    valueType: UpdateValueType;
    value: number | boolean;
}

export const UpdateValuePacketType: SerialPacketType<UpdateValuePacket> = {
    typeID: SerialPacketTypeID.UPDATE_VALUE,
    serialize: (packet) => {
        const valueTypeSize = UpdateValueTypeSize[packet.valueType];
        const payload = Buffer.alloc(5 + valueTypeSize);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeUInt16BE(packet.timestamp, 2);
        payload.writeUInt8(packet.valueType, 4);
        payload.writeUIntBE(Number(packet.value), 5, valueTypeSize);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const timestamp = packet.payload.readUInt16BE(2);
        const valueType = packet.payload.readUInt8(4) as UpdateValueType;
        const valueTypeSize = UpdateValueTypeSize[valueType];
        const value = packet.payload.readUIntBE(5, valueTypeSize);
        return {...packet, ntID, timestamp, valueType, value};
    },
    onReceive: (packet) => {
        ntService.updateValue(
            packet.ntID,
            packet.value,
            packet.timestamp
        );
        sendAckPacket(packet.id);
    },
};