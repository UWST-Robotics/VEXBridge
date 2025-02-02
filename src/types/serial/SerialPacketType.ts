import SerialPacketTypeID from "./SerialPacketTypeID.ts";
import EncodedSerialPacket from "./EncodedSerialPacket.ts";

export default interface SerialPacketType<T> {
    typeID: SerialPacketTypeID;
    serialize: (packet: T) => EncodedSerialPacket;
    onReceive: (packet: EncodedSerialPacket) => void;
};