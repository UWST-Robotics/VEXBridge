import {UpdateValuePacketType} from "./packets/UpdateValuePacket.ts";
import {GenericAckPacketType} from "./packets/GenericAckPacket.ts";
import {UpdateLabelPacketType} from "./packets/UpdateLabelPacket.ts";
import {PingPacketType} from "./packets/PingPacket.ts";
import SerialPacketType from "../../types/serial/SerialPacketType.ts";
import {LogPacketType} from "./packets/LogPacket.ts";
import {ResetPacketType} from "./packets/ResetPacket.ts";
import {FetchValuesPacketType} from "./packets/FetchValuesPacket.ts";
import {BatchValuePacketType} from "./packets/BatchValuePacket.ts";
import {BatchLabelPacketType} from "./packets/BatchLabelPacket.ts";

const SerialPacketTypes: SerialPacketType<any>[] = [
    UpdateValuePacketType,
    UpdateLabelPacketType,
    GenericAckPacketType,
    PingPacketType,
    LogPacketType,
    ResetPacketType,
    FetchValuesPacketType,
    BatchValuePacketType,
    BatchLabelPacketType
];
export default SerialPacketTypes;