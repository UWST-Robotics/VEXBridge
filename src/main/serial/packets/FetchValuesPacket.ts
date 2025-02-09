import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";

export type FetchValuesPacket = SerialPacket

export const FetchValuesPacketType: SerialPacketType<FetchValuesPacket> = {
    typeID: SerialPacketTypeID.FETCH_VALUES,
    serialize: (packet) => {
        const payload = Buffer.alloc(0);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        return {...packet};
    },
    onReceive: () => {
        // TODO: Implement
    },
};