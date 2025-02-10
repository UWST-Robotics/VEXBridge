import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import SerialPacketTypes from "../SerialPacketTypes.ts";

export interface BatchPacket extends SerialPacket {
    subType: SerialPacketTypeID;
    subPackets: SerialPacket[];
}

/**
 * A packet that contains multiple sub-packets of the same type.
 * All sub-packets must be of the same type and payload length must be less than 256 bytes.
 */
export const BatchPacketType: SerialPacketType<BatchPacket> = {
    typeID: SerialPacketTypeID.BATCH_PACKET,
    serialize: (packet) => {
        // Verify sub-packets are all match this packet type
        const invalidSubPacket = packet.subPackets.find((subPacket) => subPacket.type !== packet.type);
        if (invalidSubPacket)
            throw new Error(`Invalid sub-packet type: ${invalidSubPacket.type} (expected ${packet.type})`);

        // Verify more than 0 sub-packets
        if (packet.subPackets.length === 0)
            throw new Error("Batch packet must contain at least one sub-packet");

        // Find packet type
        const packetType = SerialPacketTypes.find((type) => type.typeID === packet.type);
        if (!packetType)
            throw new Error(`Unknown packet type: ${packet.type}`);

        // Serialize all sub-packets
        const packetArr = packet.subPackets.map((subPacket) => packetType.serialize(subPacket));

        // Verify all sub-packet payloads are less than 256 bytes
        const invalidSubPacketLength = packetArr.find((subPacket) => subPacket.payload.length > 0xFF);
        if (invalidSubPacketLength)
            throw new Error(`Sub-packet payload too long: ${invalidSubPacketLength.payload.length} bytes`);

        // Allocate buffer
        const subPacketsPayloadLength = packetArr.reduce((acc, subPacket) => acc + subPacket.payload.length, 0);
        const payload = Buffer.alloc(1 + subPacketsPayloadLength + packetArr.length);

        // Write header
        payload.writeUInt8(packet.subType, 0);

        // Copy buffers
        let offset = 1;
        for (const subPacket of packetArr) {
            // Write header
            payload.writeUInt8(subPacket.payload.length, offset);

            // Copy buffer
            subPacket.payload.copy(payload, offset + 1);

            // Increment offset
            offset += 1 + subPacket.payload.length;
        }

        return {...packet, payload};
    },
    deserialize: (packet) => {
        // Read type
        const subType = packet.payload.readUInt8(0);

        // Find packet type
        const packetType = SerialPacketTypes.find((packetType) => packetType.typeID === subType);
        if (!packetType)
            throw new Error(`Unknown packet type: ${subType}`);

        // Deserialize all sub-packets
        const subPackets: SerialPacket[] = [];
        let offset = 1;
        while (offset < packet.payload.length) {
            // Read length
            const length = packet.payload.readUInt8(offset);

            // Copy buffer
            const payload = packet.payload.subarray(offset + 1, offset + 1 + length);

            // Deserialize
            const subPacket = packetType.deserialize({type: subType, id: packet.id, payload});
            subPackets.push(subPacket);

            // Increment offset
            offset += 1 + length;
        }

        return {...packet, subType, subPackets};

    },
    onReceive: (packet) => {
        // Find packet type
        const packetType = SerialPacketTypes.find((type) => type.typeID === packet.type);
        if (!packetType)
            throw new Error(`Unknown packet type: ${packet.type}`);

        // Call onReceive for all sub-packets
        packet.subPackets.forEach((subPacket) => packetType.onReceive(subPacket));
    }
};