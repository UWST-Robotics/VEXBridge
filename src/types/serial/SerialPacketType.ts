import SerialPacketTypeID from "./SerialPacketTypeID.ts";
import EncodedSerialPacket from "./EncodedSerialPacket.ts";
import SerialPacket from "./SerialPacket.ts";

export default interface SerialPacketType<T extends SerialPacket> {
    typeID: SerialPacketTypeID;
    serialize: (packet: T) => EncodedSerialPacket;
    deserialize: (packet: EncodedSerialPacket) => T;
    onReceive: (packet: T) => void;
};