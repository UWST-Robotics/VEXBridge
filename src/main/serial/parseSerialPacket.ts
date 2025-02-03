import getChecksum from "../common/getChecksum.ts";
import SerialPacketTypes from "./SerialPacketTypes.ts";

/**
 * Decodes, deserializes, and handles an incoming
 * serial packet from a raw buffer.
 * Buffer can be any length, but must start with the packet header.
 * @param buffer - The buffer to decode
 * @returns The decoded packet
 */
export default function parseSerialPacket(buffer: Buffer) {
    // Deserialize the packet header
    // Starts with 0xC9 0x36 0xB8 0x47
    const typeID = buffer.readUInt8(4);
    const id = buffer.readUInt8(5);
    const payloadLength = buffer.readUInt16BE(6);
    const payload = buffer.subarray(8, 8 + payloadLength);

    // Checksum
    const checksum = buffer.readUInt16BE(8 + payloadLength);
    const calculatedChecksum = getChecksum(buffer, 8 + payloadLength);
    if (checksum !== calculatedChecksum)
        throw new Error(`Checksum mismatch: ${checksum} != ${calculatedChecksum}`);

    // Find the packet type
    const packetType = SerialPacketTypes.find((packetType) => packetType.typeID === typeID);
    if (!packetType)
        throw new Error(`Unknown packet type: ${typeID}`);

    // Deserialize the packet
    const deserializedPacket = packetType.deserialize({id, payload, type: typeID});

    // Call the onReceive function
    packetType.onReceive(deserializedPacket);
    return deserializedPacket;
}