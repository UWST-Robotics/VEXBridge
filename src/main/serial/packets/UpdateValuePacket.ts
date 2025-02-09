import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import ntService from "../../services/NTService.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";

// Types of values that can be updated
export enum UpdateValueType {
    BOOL = 1,
    INT = 2,
    FLOAT = 3,
    DOUBLE = 4
}

// Size of each value type in bytes
export const UpdateValueTypeSize = {
    [UpdateValueType.BOOL]: 1,
    [UpdateValueType.INT]: 2,
    [UpdateValueType.FLOAT]: 4,
    [UpdateValueType.DOUBLE]: 8,
};

export interface UpdateValuePacket extends SerialPacket {
    ntID: number;
    valueType: UpdateValueType;
    value: number | boolean;
}

export const UpdateValuePacketType: SerialPacketType<UpdateValuePacket> = {
    typeID: SerialPacketTypeID.UPDATE_VALUE,
    serialize: (packet) => {
        const valueTypeSize = UpdateValueTypeSize[packet.valueType];
        const payload = Buffer.alloc(3 + valueTypeSize);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeUInt8(packet.valueType, 2);

        switch (packet.valueType) {
            case UpdateValueType.BOOL:
                payload.writeUInt8(packet.value as number, 3);
                break;
            case UpdateValueType.INT:
                payload.writeInt16BE(packet.value as number, 3);
                break;
            case UpdateValueType.FLOAT:
                payload.writeFloatBE(packet.value as number, 3);
                break;
            case UpdateValueType.DOUBLE:
                payload.writeDoubleBE(packet.value as number, 3);
                break;
            default:
                throw new Error(`Unknown value type: ${packet.valueType}`);
        }

        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const valueType = packet.payload.readUInt8(2) as UpdateValueType;

        let value = 0;
        switch (valueType) {
            case UpdateValueType.BOOL:
                value = packet.payload.readUInt8(3);
                break;
            case UpdateValueType.INT:
                value = packet.payload.readInt16BE(3);
                break;
            case UpdateValueType.FLOAT:
                value = packet.payload.readFloatBE(3);
                break;
            case UpdateValueType.DOUBLE:
                value = packet.payload.readDoubleBE(3);
                break;
            default:
                throw new Error(`Unknown value type: ${valueType}`);
        }

        return {...packet, ntID, valueType, value};
    },
    onReceive: (packet) => {
        ntService.updateValue(
            packet.ntID,
            packet.value
        );
        sendAckPacket(packet.id);
    },
};