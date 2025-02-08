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
    [UpdateValueType.DOUBLE]: 8,
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

        switch (packet.valueType) {
            case UpdateValueType.BOOL:
                payload.writeUInt8(packet.value as number, 5);
                break;
            case UpdateValueType.INT:
                payload.writeUInt16BE(packet.value as number, 5);
                break;
            case UpdateValueType.DOUBLE:
                payload.writeDoubleBE(packet.value as number, 5);
                break;
            default:
                throw new Error(`Unknown value type: ${packet.valueType}`);
        }

        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const timestamp = packet.payload.readUInt16BE(2);
        const valueType = packet.payload.readUInt8(4) as UpdateValueType;

        let value = 0;
        switch (valueType) {
            case UpdateValueType.BOOL:
                value = packet.payload.readUInt8(5);
                break;
            case UpdateValueType.INT:
                value = packet.payload.readUInt16BE(5);
                break;
            case UpdateValueType.DOUBLE:
                value = packet.payload.readDoubleBE(5);
                break;
            default:
                throw new Error(`Unknown value type: ${valueType}`);
        }

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