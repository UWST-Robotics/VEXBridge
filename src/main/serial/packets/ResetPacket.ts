import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";
import resetService from "../../services/ResetService.ts";
import logger from "../../common/Logger.ts";

export type ResetPacket = SerialPacket;

export const ResetPacketType: SerialPacketType<ResetPacket> = {
    typeID: SerialPacketTypeID.RESET,
    serialize: (packet) => {
        const payload = Buffer.alloc(0);
        return {...packet, payload};
    },
    deserialize: (packet) => {
        return {...packet};
    },
    onReceive: (packet) => {
        logger.info("Received reset command");
        resetService.reset();
        sendAckPacket(packet.id);
    },
};