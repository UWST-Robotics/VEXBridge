import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import ntService from "../../services/NTService.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";

export interface UpdateLabelPacket extends SerialPacket {
    ntID: number;
    label: string;
}

export const UpdateLabelPacketType: SerialPacketType<UpdateLabelPacket> = {
    typeID: SerialPacketTypeID.UPDATE_LABEL,
    serialize: (packet) => {
        const labelLength = Buffer.byteLength(packet.label);
        const payload = Buffer.alloc(4 + labelLength);
        payload.writeUInt16BE(packet.ntID, 0);
        payload.writeUInt16BE(labelLength, 2);
        payload.write(packet.label, 4, labelLength, "utf8");
        return {...packet, payload};
    },
    deserialize: (packet) => {
        const ntID = packet.payload.readUInt16BE(0);
        const labelLength = packet.payload.readUInt16BE(2);
        const label = packet.payload.toString("utf8", 4, 4 + labelLength);
        return {...packet, ntID, label};
    },
    onReceive: (packet) => {
        ntService.setPathForKey(packet.ntID, packet.label);
        sendAckPacket(packet.id);
    },
};