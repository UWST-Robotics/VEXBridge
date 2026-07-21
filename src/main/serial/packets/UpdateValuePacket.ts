import SerialPacket from "../../../types/serial/SerialPacket.ts";
import NTValue from "../../../types/nt/NTValue.ts";
import ntService from "../../services/NTService.ts";
import {sendAckPacket} from "../sendSerialPacket.ts";

export interface UpdateValuePacket<T extends NTValue> extends SerialPacket {
    ntID: number;
    value: T;
}

export function onReceive<T extends NTValue>(packet: UpdateValuePacket<T>) {
    ntService.updateValue(
        packet.ntID,
        packet.value
    );
    sendAckPacket(packet.id);
}