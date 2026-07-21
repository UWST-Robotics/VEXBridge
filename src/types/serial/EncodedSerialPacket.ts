import SerialPacket from "./SerialPacket.ts";

export default interface EncodedSerialPacket extends SerialPacket {
    payload: Buffer;
};