import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import ntService from "../../services/NTService.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";
import {UpdateLabelPacket} from "./UpdateLabelPacket.ts";

export interface BatchLabelPacket extends SerialPacket {
    subPackets: UpdateLabelPacket[];
}

export const BatchLabelPacketType: SerialPacketType<BatchLabelPacket> = {
    typeID: SerialPacketTypeID.BATCH_LABEL,
    serialize: (packet) => {

        // Calculate payload size
        let payloadSize = 1;
        for (const subPacket of packet.subPackets)
            payloadSize += 4 + Math.min(Buffer.byteLength(subPacket.label), 0xFFFF);

        // Allocate buffer
        const payload = Buffer.alloc(payloadSize);
        payload.writeUInt8(packet.subPackets.length, 0);

        // Write sub-packets
        let offset = 1;
        for (const subPacket of packet.subPackets) {
            const labelLength = Math.min(Buffer.byteLength(subPacket.label), 0xFFFF);

            payload.writeUInt16BE(subPacket.ntID, offset);
            payload.writeUInt16BE(labelLength, offset + 2);
            payload.write(subPacket.label, offset + 4, labelLength, "utf8");

            offset += 4 + labelLength;
        }

        return {...packet, payload};
    },
    deserialize: (packet) => {
        const subPacketCount = packet.payload.readUInt8(0);

        let offset = 1;
        const subPackets: UpdateLabelPacket[] = [];

        // Iterate through sub-packets
        for (let i = 0; i < subPacketCount; i++) {
            const ntID = packet.payload.readUInt16BE(offset);
            const labelLength = packet.payload.readUInt16BE(offset + 2);
            const label = packet.payload.toString("utf8", offset + 4, offset + 4 + labelLength);

            subPackets.push({
                id: packet.id,
                type: SerialPacketTypeID.UPDATE_VALUE,
                ntID,
                label
            });

            offset += 4 + labelLength;
        }

        return {...packet, subPackets};
    },
    onReceive: (packet) => {
        packet.subPackets.forEach((subPacket) => {
            ntService.setPathForKey(subPacket.ntID, subPacket.label);
        });
        sendAckPacket(packet.id);
    },
};