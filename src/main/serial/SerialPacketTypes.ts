import {UpdateValuePacketType} from "./packets/UpdateValuePacket.ts";
import {GenericAckPacketType} from "./packets/GenericAckPacket.ts";
import {UpdateLabelPacketType} from "./packets/UpdateLabelPacket.ts";
import {PingPacketType} from "./packets/PingPacket.ts";
import SerialPacketType from "../../types/serial/SerialPacketType.ts";
import {LogPacketType} from "./packets/LogPacket.ts";
import {ResetPacketType} from "./packets/ResetPacket.ts";
import {GetUpdatedValuesPacketType} from "./packets/UpdatedValuesPacket.ts";
import {BatchValuePacketType} from "./packets/BatchValuePacket.ts";

const SerialPacketTypes: SerialPacketType<any>[] = [
    UpdateValuePacketType,
    UpdateLabelPacketType,
    GenericAckPacketType,
    PingPacketType,
    LogPacketType,
    ResetPacketType,
    GetUpdatedValuesPacketType,
    BatchValuePacketType
];
export default SerialPacketTypes;