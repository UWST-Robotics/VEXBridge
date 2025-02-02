import getChecksum from "./getChecksum.ts";
import SerialPacketTypes from "../../../types/serial/SerialPacketTypes.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import serialService from "../../services/serial/SerialService.ts";

export default function sendSerialPacket(packet: SerialPacket) {
    // Serialize packet
    const serializedPacket = serializeSerialPacket(packet);

    // Allocate buffer
    const buffer = Buffer.alloc(10 + serializedPacket.payload.length);

    // Header
    buffer.writeUInt8(0xC9, 0);
    buffer.writeUInt8(0x36, 1);
    buffer.writeUInt8(0xB8, 2);
    buffer.writeUInt8(0x47, 3);

    // Type
    buffer.writeUInt8(serializedPacket.type, 4);

    // ID
    buffer.writeUInt8(serializedPacket.id, 5);

    // Payload Size
    buffer.writeUInt16LE(serializedPacket.payload.length, 6);

    // Payload
    serializedPacket.payload.copy(buffer, 8);

    // Checksum
    const checksum = getChecksum(buffer, 8 + serializedPacket.payload.length);
    buffer.writeUInt16LE(checksum, 8 + serializedPacket.payload.length);

    // Write buffer to serial
    serialService.write(buffer).catch(console.error);
}

function serializeSerialPacket(packet: SerialPacket) {
    for (const type of SerialPacketTypes) {
        if (packet.type === type.typeID)
            return type.serialize(packet as never);
    }

    throw new Error(`Unknown packet type: ${packet.type}`);
}