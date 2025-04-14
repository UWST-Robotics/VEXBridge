import {GenericAckPacketType} from "./packets/GenericAckPacket.ts";
import {UpdateLabelPacketType} from "./packets/UpdateLabelPacket.ts";
import {PingPacketType} from "./packets/PingPacket.ts";
import SerialPacketType from "../../types/serial/SerialPacketType.ts";
import {LogPacketType} from "./packets/LogPacket.ts";
import {ResetPacketType} from "./packets/ResetPacket.ts";
import {UpdateBoolPacketType} from "./packets/UpdateBoolPacket.ts";
import {UpdateIntPacketType} from "./packets/UpdateIntPacket.ts";
import {UpdateFloatPacketType} from "./packets/UpdateFloatPacket.ts";
import {UpdateDoublePacketType} from "./packets/UpdateDoublePacket.ts";
import {UpdateStringPacketType} from "./packets/UpdateStringPacket.ts";
import {BatchPacketType} from "./packets/BatchPacket.ts";
import {GenericNAckPacketType} from "./packets/GenericNAckPacket.ts";
import {UpdateIntArrayPacketType} from "./packets/UpdateIntArrayPacket.ts";
import {UpdateFloatArrayPacketType} from "./packets/UpdateFloatArrayPacket.ts";
import {UpdateDoubleArrayPacketType} from "./packets/UpdateDoubleArrayPacket.ts";
import {UpdateBoolArrayPacketType} from "./packets/UpdateBoolArrayPacket.ts";

const SerialPacketTypes: SerialPacketType<any>[] = [
    ResetPacketType,
    UpdateLabelPacketType,
    LogPacketType,
    PingPacketType,
    GenericAckPacketType,
    GenericNAckPacketType,

    UpdateBoolPacketType,
    UpdateIntPacketType,
    UpdateFloatPacketType,
    UpdateDoublePacketType,
    UpdateStringPacketType,

    UpdateBoolArrayPacketType,
    UpdateIntArrayPacketType,
    UpdateFloatArrayPacketType,
    UpdateDoubleArrayPacketType,

    BatchPacketType
];
export default SerialPacketTypes;