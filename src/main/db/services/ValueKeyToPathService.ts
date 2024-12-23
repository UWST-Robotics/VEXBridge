import ValueKeyToPathModel from "../models/ValueKeyToPathModel.ts";

export async function setPathForKey(sessionID: number, key: number, path: string) {
    await ValueKeyToPathModel.create({
        sessionID: sessionID,
        key: key,
        path: path
    });
}

export async function getAllPaths(sessionID: number) {
    return await ValueKeyToPathModel.findAll({where: {sessionID: sessionID}});
}

export async function getPathForKey(sessionID: number, key: number) {
    return await ValueKeyToPathModel.findOne({where: {sessionID: sessionID, key: key}});
}