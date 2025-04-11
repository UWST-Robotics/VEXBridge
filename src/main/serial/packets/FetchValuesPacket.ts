import SerialPacketTypeID from "../../../types/serial/SerialPacketTypeID.ts";
import SerialPacketType from "../../../types/serial/SerialPacketType.ts";
import SerialPacket from "../../../types/serial/SerialPacket.ts";
import valueUpdateQueueService from "../../services/ValueUpdateQueueService.ts";
import sendSerialPacket, {sendAckPacket} from "../sendSerialPacket.ts";
import {UpdateValuePacket} from "./UpdateValuePacket.ts";
import NTValue from "../../../types/nt/NTValue.ts";

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
    onReceive: (packet) => {

        // Pop the next value from the queue
        const nextValue = valueUpdateQueueService.popValueFromQueue();
        if (!nextValue)
            return sendAckPacket(packet.id);

        // Create the response packet
        const responsePacket: UpdateValuePacket<NTValue> = {
            id: packet.id,
            type: SerialPacketTypeID.UNKNOWN,
            ntID: 0,
            value: 0,
        };

        // Interpret the value type
        const isBool = typeof nextValue.value === "boolean";
        const isInteger = Number.isInteger(nextValue.value);
        const isFloat = typeof nextValue.value === "number" && !isInteger;
        const isString = typeof nextValue.value === "string";

        if (isBool)
            responsePacket.type = SerialPacketTypeID.UPDATE_BOOL;
        else if (isInteger)
            responsePacket.type = SerialPacketTypeID.UPDATE_INT;
        else if (isFloat)
            responsePacket.type = SerialPacketTypeID.UPDATE_DOUBLE;
        else if (isString)
            responsePacket.type = SerialPacketTypeID.UPDATE_STRING;

        // Send the packet
        sendSerialPacket(responsePacket).catch(console.error);
    },
};