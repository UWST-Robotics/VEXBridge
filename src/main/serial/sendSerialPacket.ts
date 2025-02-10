import getChecksum from "../common/getChecksum.ts";
import SerialPacketTypes from "./SerialPacketTypes.ts";
import SerialPacket from "../../types/serial/SerialPacket.ts";
import serialService from "../services/serial/SerialService.ts";
import {GenericAckPacket} from "./packets/GenericAckPacket.ts";
import SerialPacketTypeID from "../../types/serial/SerialPacketTypeID.ts";
import logger from "../common/Logger.ts";
import encodeByteStuffing from "./cobs/encodeByteStuffing.ts";
import {GenericNAckPacket} from "./packets/GenericNAckPacket.ts";

/**
 * Sends a serial packet over the active serial connection
 * @param packet - Packet to send
 * @returns Promise that resolves when the serial packet has been written
 */
export default function sendSerialPacket<T extends SerialPacket>(packet: T) {
    logger.verbose(`Sending packet ${packet.id} of type ${packet.type}`);

    // Find Packet Type
    const packetType = SerialPacketTypes.find((type) => type.typeID === packet.type);
    if (!packetType)
        throw new Error(`Unknown packet type: ${packet.type}`);

    // Serialize Packet
    const serializedPacket = packetType.serialize(packet);

    // Allocate buffer
    let buffer = Buffer.alloc(5 + serializedPacket.payload.length);

    // Data
    buffer.writeUInt8(serializedPacket.type, 0);                // Type ID
    buffer.writeUInt8(serializedPacket.id, 1);                  // Packet ID
    buffer.writeUInt16BE(serializedPacket.payload.length, 2);   // Payload length
    serializedPacket.payload.copy(buffer, 4);                   // Payload

    // Append Checksum
    const checksum = getChecksum(buffer, 4 + serializedPacket.payload.length);
    buffer.writeUInt8(checksum, 4 + serializedPacket.payload.length);

    // Log
    logger.debug(`Write buffer: ${buffer.toString("hex")}`);

    // Encode COBS
    buffer = encodeByteStuffing(buffer);
    logger.debug(`Encoded buffer: ${buffer.toString("hex")}`);

    // Write buffer to serial
    return serialService.write(buffer);
}

/**
 * Send an ACK packet for the given packet ID
 * @param id - Packet ID
 * @returns Promise that resolves when the ACK packet has been written
 */
export function sendAckPacket(id: number) {
    sendSerialPacket<GenericAckPacket>({
        id,
        type: SerialPacketTypeID.GENERIC_ACK
    }).catch(logger.error);
}

/**
 * Sends a NACK packet (negative acknowledgment) for the last received packet
 * @returns Promise that resolves when the NACK packet has been written
 */
export function sendNackPacket() {
    sendSerialPacket<GenericNAckPacket>({
        id: 0,
        type: SerialPacketTypeID.GENERIC_NACK
    }).catch(logger.error);
}