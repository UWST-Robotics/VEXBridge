import ValueChangeModel from "../models/ValueChangeModel.ts";
import NTValue from "../../../types/nt/NTValue.ts";

export async function recordValueChange(sessionID: number, key: number, value: NTValue) {
    await ValueChangeModel.create({
        sessionID: sessionID,
        timestamp: new Date(),
        key: key,
        newValue: value
    });
}

export async function getValueChanges(sessionID: number, key: number) {
    return await ValueChangeModel.findAll({
        where: {sessionID: sessionID, key: key},
        order: [["timestamp", "ASC"]]
    });
}

export async function getCurrentValue(sessionID: number, key: number) {
    return await ValueChangeModel.findOne({
        where: {sessionID: sessionID, key: key},
        order: [["timestamp", "DESC"]]
    });
}