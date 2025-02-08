import getChecksum from "../common/getChecksum.ts";
import SerialPacketTypes from "./SerialPacketTypes.ts";
import Logger from "../common/Logger.ts";
import decodeCOBS from "./cobs/decodeCOBS.ts";

/**
 * Decodes, deserializes, and handles an incoming
 * serial packet from a raw buffer.
 * Buffer can be any length, but must start with the packet header.
 * @param buffer - The buffer to decode
 * @returns The decoded packet
 */
export default function parseSerialPacket(buffer: Buffer) {
    Logger.info(`Received serial packet: ${buffer.toString("hex")}`);

    // Decode COBS
    buffer = decodeCOBS(buffer);
    Logger.info(`Decoded serial packet: ${buffer.toString("hex")}`);

    // Deserialize the packet header
    // Starts with 0xC9 0x36 0xB8 0x47
    const typeID = buffer.readUInt8(4);
    const id = buffer.readUInt8(5);
    const payloadLength = buffer.readUInt16BE(6);
    const payload = buffer.subarray(8, 8 + payloadLength);

    Logger.info(`Parsed serial packet: type=${typeID}, id=${id}, payload=${payload.toString("hex")} (length=${payloadLength})`);

    // Checksum
    const checksum = buffer.readUInt16BE(8 + payloadLength);
    const calculatedChecksum = getChecksum(buffer.subarray(0, 8 + payloadLength));
    if (checksum !== calculatedChecksum)
        throw new Error(`Checksum mismatch: ${checksum} != ${calculatedChecksum}`);

    Logger.info(`Checksum OK: ${checksum} == ${calculatedChecksum}`);

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