import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import ntService from "../../services/NTService.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";
import {UpdateValuePacket, UpdateValueType, UpdateValueTypeSize} from "./UpdateValuePacket.ts";

export interface BatchValuePacket extends SerialPacket {
    timestamp: number;
    subPackets: UpdateValuePacket[];
}

export const BatchValuePacketType: SerialPacketType<BatchValuePacket> = {
    typeID: SerialPacketTypeID.BATCH_VALUE,
    serialize: (packet) => {

        // Calculate payload size
        let payloadSize = 3;
        for (const subPacket of packet.subPackets)
            payloadSize += 3 + UpdateValueTypeSize[subPacket.valueType];

        // Allocate buffer
        const payload = Buffer.alloc(payloadSize);
        payload.writeUInt16BE(packet.timestamp, 0);
        payload.writeUInt8(packet.subPackets.length, 2);

        // Write sub-packets
        let offset = 3;
        for (const subPacket of packet.subPackets) {
            payload.writeUInt16BE(subPacket.ntID, offset);
            payload.writeUInt8(subPacket.valueType, offset + 2);

            switch (subPacket.valueType) {
                case UpdateValueType.BOOL:
                    payload.writeUInt8(subPacket.value as number, offset + 3);
                    break;
                case UpdateValueType.INT:
                    payload.writeUInt16BE(subPacket.value as number, offset + 3);
                    break;
                case UpdateValueType.DOUBLE:
                    payload.writeDoubleBE(subPacket.value as number, offset + 3);
                    break;
                default:
                    throw new Error(`Unknown value type: ${subPacket.valueType}`);
            }

            offset += 3 + UpdateValueTypeSize[subPacket.valueType];
        }

        return {...packet, payload};
    },
    deserialize: (packet) => {
        const timestamp = packet.payload.readUInt16BE(0);
        const subPacketCount = packet.payload.readUInt8(2);

        let offset = 3;
        const subPackets: UpdateValuePacket[] = [];

        // Iterate through sub-packets
        for (let i = 0; i < subPacketCount; i++) {
            const ntID = packet.payload.readUInt16BE(offset);
            const valueType = packet.payload.readUInt8(offset + 2) as UpdateValueType;

            let value = 0;
            switch (valueType) {
                case UpdateValueType.BOOL:
                    value = packet.payload.readUInt8(offset + 3);
                    break;
                case UpdateValueType.INT:
                    value = packet.payload.readUInt16BE(offset + 3);
                    break;
                case UpdateValueType.DOUBLE:
                    value = packet.payload.readDoubleBE(offset + 3);
                    break;
                default:
                    throw new Error(`Unknown value type: ${valueType}`);
            }

            subPackets.push({
                id: packet.id,
                type: SerialPacketTypeID.UPDATE_VALUE,
                timestamp,
                ntID,
                valueType,
                value,
            });

            offset += 3 + UpdateValueTypeSize[valueType];
        }

        return {...packet, timestamp, subPackets};
    },
    onReceive: (packet) => {
        packet.subPackets.forEach((subPacket) => {
            ntService.updateValue(
                subPacket.ntID,
                subPacket.value,
                subPacket.timestamp
            );
        });
        sendAckPacket(packet.id);
    },
};