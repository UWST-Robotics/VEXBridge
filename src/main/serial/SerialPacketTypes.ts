import {GenericAckPacketType} from "./packets/GenericAckPacket.ts";
import {UpdateLabelPacketType} from "./packets/UpdateLabelPacket.ts";
import {PingPacketType} from "./packets/PingPacket.ts";
import SerialPacketType from "../../types/serial/SerialPacketType.ts";
import {LogPacketType} from "./packets/LogPacket.ts";
import {ResetPacketType} from "./packets/ResetPacket.ts";
import {FetchValuesPacketType} from "./packets/FetchValuesPacket.ts";
import {UpdateBoolPacketType} from "./packets/UpdateBoolPacket.ts";
import {UpdateIntPacketType} from "./packets/UpdateIntPacket.ts";
import {UpdateFloatPacketType} from "./packets/UpdateFloatPacket.ts";
import {UpdateDoublePacketType} from "./packets/UpdateDoublePacket.ts";
import {UpdateStringPacketType} from "./packets/UpdateStringPacket.ts";
import {BatchPacketType} from "./packets/BatchPacket.ts";
import {GenericNAckPacketType} from "./packets/GenericNAckPacket.ts";

const SerialPacketTypes: SerialPacketType<any>[] = [
    ResetPacketType,
    UpdateLabelPacketType,
    FetchValuesPacketType,
    LogPacketType,
    PingPacketType,
    GenericAckPacketType,
    GenericNAckPacketType,

    UpdateBoolPacketType,
    UpdateIntPacketType,
    UpdateFloatPacketType,
    UpdateDoublePacketType,
    UpdateStringPacketType,

    BatchPacketType
];
export default SerialPacketTypes;