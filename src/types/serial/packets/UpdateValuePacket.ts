import EncodedSerialPacket from "../EncodedSerialPacket.ts";
import SerialPacketTypeID from "../SerialPacketTypeID.ts";
import SerialPacketType from "../SerialPacketType.ts";
import ntService from "../../../main/services/NTService.ts";
import SerialPacket from "../SerialPacket.ts";
import sendSerialPacket from "../../../main/common/serial/sendSerialPacket.ts";

export enum UpdateValueType {
    BOOL = 1,
    INT = 2,
    DOUBLE = 3,
}

export default interface UpdateValuePacket extends SerialPacket {
    ntID: number;
    timestamp: number;
    valueType: UpdateValueType;
    value: number | boolean;
};

export const UpdateValuePacketType: SerialPacketType<UpdateValuePacket> = {
    typeID: SerialPacketTypeID.UPDATE_VALUE,
    serialize: (_: UpdateValuePacket) => {
        throw new Error("UpdateValuePacket should not be sent");
    },
    onReceive: (packet: EncodedSerialPacket) => {

        // Deserialize
        const {payload} = packet;

        // Check for minimum packet length
        if (payload.length < 5)
            throw new Error("Invalid packet length");

        const ntID = payload.readUInt16BE(0);
        const timestamp = payload.readUInt16BE(2);
        const valueType = payload.readUInt8(4);

        // Check for minimum packet length
        const valueTypeSize = valueType === UpdateValueType.INT ? 2 : valueType === UpdateValueType.DOUBLE ? 4 : 1;
        if (payload.length < 5 + valueTypeSize)
            throw new Error("Invalid packet length");

        let value: number | boolean;
        switch (valueType) {
            case UpdateValueType.INT:
                value = payload.readInt16BE(5);
                break;
            case UpdateValueType.DOUBLE:
                value = payload.readUint32BE(5);
                break;
            case UpdateValueType.BOOL:
                value = payload.readUInt8(5) === 1;
                break;
            default:
                throw new Error(`Invalid value type: ${valueType}`);
        }

        // Handle
        ntService.updateValue(ntID, value, timestamp);
        sendSerialPacket({type: SerialPacketTypeID.GENERIC_ACK, id: packet.id});
    },
};