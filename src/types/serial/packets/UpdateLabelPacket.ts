import EncodedSerialPacket from "../EncodedSerialPacket.ts";
import SerialPacketTypeID from "../SerialPacketTypeID.ts";
import SerialPacketType from "../SerialPacketType.ts";
import ntService from "../../../main/services/NTService.ts";
import SerialPacket from "../SerialPacket.ts";
import sendSerialPacket from "../../../main/common/serial/sendSerialPacket.ts";
import Logger from "../../../main/common/Logger.ts";

export default interface UpdateLabelPacket extends SerialPacket {
    ntID: number;
    label: string;
};

export const UpdateLabelPacketType: SerialPacketType<UpdateLabelPacket> = {
    typeID: SerialPacketTypeID.UPDATE_LABEL,
    serialize: (_: UpdateLabelPacket) => {
        throw new Error("UpdateLabelPacket should not be sent");
    },
    onReceive: (packet: EncodedSerialPacket) => {

        if (packet.payload.length < 4)
            throw new Error("Invalid packet length");

        // Deserialize
        const {payload} = packet;
        const ntID = payload.readUInt16BE(0);
        const length = payload.readUInt16BE(2);

        Logger.info(`Label ${ntID} ${length}`);

        if (payload.length < 4 + length)
            throw new Error("Invalid packet length");

        const label = payload.toString("utf8", 4, 4 + length);
        Logger.info(`Label ${ntID} == ${label}`);

        // Handle
        ntService.setPathForKey(ntID, label);
        sendSerialPacket({type: SerialPacketTypeID.GENERIC_ACK, id: packet.id});
    },
};