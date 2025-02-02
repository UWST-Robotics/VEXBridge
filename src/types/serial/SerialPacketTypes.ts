import {UpdateValuePacketType} from "./packets/UpdateValuePacket.ts";
import {GenericAckPacketType} from "./packets/GenericAckPacket.ts";
import {UpdateLabelPacketType} from "./packets/UpdateLabelPacket.ts";

const SerialPacketTypes = [
    UpdateValuePacketType,
    UpdateLabelPacketType,
    GenericAckPacketType,
];
export default SerialPacketTypes;