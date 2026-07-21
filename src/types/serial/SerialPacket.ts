import SerialPacketTypeID from "./SerialPacketTypeID.ts";

export default interface SerialPacket {
    id: number;
    type: SerialPacketTypeID;
};