import getChecksum from "../common/getChecksum.ts";
import SerialPacketTypes from "./SerialPacketTypes.ts";
import SerialPacket from "../../types/serial/SerialPacket.ts";
import serialService from "../services/serial/SerialService.ts";
import {GenericAckPacket} from "./packets/GenericAckPacket.ts";
import SerialPacketTypeID from "../../types/serial/SerialPacketTypeID.ts";
import Logger from "../common/Logger.ts";

/**
 * Sends a serial packet over the active serial connection
 * @param packet - Packet to send
 * @returns Promise that resolves when the serial packet has been written
 */
export default function sendSerialPacket<T extends SerialPacket>(packet: T) {
    // Find Packet Type
    const packetType = SerialPacketTypes.find((type) => type.typeID === packet.type);
    if (!packetType)
        throw new Error(`Unknown packet type: ${packet.type}`);

    // Serialize Packet
    const serializedPacket = packetType.serialize(packet);

    // Allocate buffer
    const buffer = Buffer.alloc(10 + serializedPacket.payload.length);

    // Header
    buffer.writeUInt8(0xC9, 0);
    buffer.writeUInt8(0x36, 1);
    buffer.writeUInt8(0xB8, 2);
    buffer.writeUInt8(0x47, 3);

    // Data
    buffer.writeUInt8(serializedPacket.type, 4);                // Type ID
    buffer.writeUInt8(serializedPacket.id, 5);                  // Packet ID
    buffer.writeUInt16LE(serializedPacket.payload.length, 6);   // Payload length
    serializedPacket.payload.copy(buffer, 8);                   // Payload

    // Append Checksum
    const checksum = getChecksum(buffer, 8 + serializedPacket.payload.length);
    buffer.writeUInt16LE(checksum, 8 + serializedPacket.payload.length);

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
        type: SerialPacketTypeID.GENERIC_ACK,
        targetID: id,
    }).catch(Logger.error);
}