import getChecksum from "../common/getChecksum.ts";
import SerialPacketTypes from "./SerialPacketTypes.ts";
import decodeByteStuffing from "./byteStuffing/decodeByteStuffing.ts";
import logger from "../common/Logger.ts";
import logService from "../services/LogService.ts";

const PROS_PREFIXES = [
    "sout",  // Standard Output
    "serr",  // Standard Error
    "kdbg"   // Kernel Debug
];

/**
 * Decodes, deserializes, and handles an incoming
 * serial packet from a raw buffer.
 * Buffer can be any length, but must start with the packet header.
 * @param buffer - The buffer to decode
 * @returns The decoded packet
 */
export default function parseSerialPacket(buffer: Buffer) {
    logger.debug(`Parsing serial buffer: ${buffer.toString("hex")}`);

    // Check for PROS Prefix
    const bufferString = buffer.toString("utf8").slice(1);
    const prefix = PROS_PREFIXES.find((p) => bufferString.startsWith(p));
    if (prefix) {
        // Parse message
        const message = bufferString.slice(prefix.length);
        const isError = prefix !== "sout";
        const messagePrefix = isError ? "\x1b[31m" : "";
        const messageSuffix = isError ? "\x1b[0m" : "";

        logService.log(`${messagePrefix}${message}${messageSuffix}`);
        logger.verbose(`PROS Serial: ${prefix} - ${message}`);
        return;
    }

    // Decode COBS
    buffer = decodeByteStuffing(buffer);
    logger.debug(`Decoded serial buffer: ${buffer.toString("hex")}`);

    // Deserialize the packet header
    const typeID = buffer.readUInt8(0);
    const id = buffer.readUInt8(1);
    const payloadLength = buffer.readUInt16BE(2);
    const payload = buffer.subarray(4, 4 + payloadLength);

    // Log
    logger.verbose(`Decoded serial packet ${id} of type ${typeID} (${payloadLength})`);

    // Checksum
    const checksum = buffer.readUInt8(4 + payloadLength);
    const calculatedChecksum = getChecksum(buffer, 4 + payloadLength);
    if (checksum !== calculatedChecksum)
        throw new Error(`Checksum mismatch: ${checksum} != ${calculatedChecksum}`);
    logger.debug(`Checksum verified: ${checksum}`);

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