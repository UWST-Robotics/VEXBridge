import getChecksum from "./getChecksum.ts";
import SerialPacketTypes from "../../../types/serial/SerialPacketTypes.ts";
import EncodedSerialPacket from "../../../types/serial/EncodedSerialPacket.ts";
import Logger from "../Logger.ts";

/**
 * Decodes and deserializes a serial packet from a buffer into a complete packet
 * @param buffer - The buffer to decode
 * @returns The decoded packet
 */
export default function parseSerialPacket(buffer: Buffer) {

    // Check for minimum packet length
    if (buffer.length < 8)
        return null;

    // Header
    // 0xC9 0x36 0xB8 0x47

    // Type
    const type = buffer.readUInt8(4);

    // ID
    const id = buffer.readUInt8(5);

    // Payload Size
    const payloadLength = buffer.readUInt16BE(6);
    if (buffer.length < 10 + payloadLength)
        return null;

    Logger.info(`Received packet of type ${type} with ID ${id} and payload length ${payloadLength}`);

    // Payload
    const payload = buffer.subarray(8, 8 + payloadLength);

    // Checksum
    const checksum = buffer.readUInt16BE(8 + payloadLength);
    const calculatedChecksum = getChecksum(buffer, 8 + payloadLength);
    // if (checksum !== calculatedChecksum)
    //     return null;

    // Pack into packet
    const packet: EncodedSerialPacket = {
        id,
        type,
        payload
    };

    // Handle packet
    for (const type of SerialPacketTypes) {
        if (packet.type === type.typeID)
            return type.onReceive(packet);
    }
}