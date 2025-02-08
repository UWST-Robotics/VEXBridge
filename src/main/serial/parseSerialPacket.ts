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
    // Log
    Logger.info(`Received serial packet: ${buffer.toString("hex")}`);

    // Decode COBS
    buffer = decodeCOBS(buffer);

    // Deserialize the packet header
    const typeID = buffer.readUInt8(0);
    const id = buffer.readUInt8(1);
    const payloadLength = buffer.readUInt16BE(2);
    const payload = buffer.subarray(4, 4 + payloadLength);

    // Log
    Logger.info(`Parsed serial packet: type=${typeID}, id=${id}, payload=${payload.toString("hex")} (length=${payloadLength})`);

    // Checksum
    const checksum = buffer.readUInt16BE(4 + payloadLength);
    const calculatedChecksum = getChecksum(buffer.subarray(0, 4 + payloadLength));
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