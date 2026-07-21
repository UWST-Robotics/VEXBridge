import {Router} from "express";
import ntService from "../services/NTService.ts";
import {UpdateValuePacket} from "../serial/packets/UpdateValuePacket.ts";
import sendSerialPacket from "../serial/sendSerialPacket.ts";
import SerialPacketTypeID from "../../types/serial/SerialPacketTypeID.ts";

const ntValuesRouter = Router();
export default ntValuesRouter;

ntValuesRouter.get("/", (_, res) => {

    // Get the value keys from the database
    const allValues = ntService.getAllValues();
    res.json(allValues);
});

ntValuesRouter.post("/", (req, res) => {

    // Get path and value from request body
    const path = req.query.path as string | undefined;
    if (!path) {
        res.status(400).send("Path is required");
        return;
    }

    const value = req.query.value as string | undefined;
    if (!value) {
        res.status(400).send("Value is required");
        return;
    }

    // Search for id from path
    const key = ntService.getKeyForPath(path);
    if (key === undefined) {
        res.status(404).send("Path not found");
        return;
    }

    // Update value
    ntService.updateValue(key, value);

    // Parse value to number
    const numericValue = Number(value);
    const booleanValue = Boolean(value);

    const isNumber = !isNaN(numericValue);
    const isBoolean = value === "true" || value === "false";

    // Write value to serial port
    if (isNumber) {
        sendSerialPacket<UpdateValuePacket<number>>({
            id: 0,
            type: SerialPacketTypeID.UPDATE_DOUBLE,
            ntID: key,
            value: numericValue
        }).catch(console.error);
    } else if (isBoolean) {
        sendSerialPacket<UpdateValuePacket<boolean>>({
            id: 0,
            type: SerialPacketTypeID.UPDATE_BOOL,
            ntID: key,
            value: booleanValue
        }).catch(console.error);
    } else {
        sendSerialPacket<UpdateValuePacket<string>>({
            id: 0,
            type: SerialPacketTypeID.UPDATE_STRING,
            ntID: key,
            value: value
        }).catch(console.error);
    }
    res.send("OK");
});