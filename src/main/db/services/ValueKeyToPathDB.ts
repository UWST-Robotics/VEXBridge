import ValueKeyToPathModel from "../models/ValueKeyToPathModel.ts";

export async function setPathForKey(sessionID: number, key: number, path: string) {

    // Update the path if it already exists
    const existing = await ValueKeyToPathModel.findOne({where: {sessionID: sessionID, key: key}});
    if (existing) {
        await existing.update({path: path});
        return;
    }

    // Otherwise, create a new entry
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

export async function deletePathsOfSession(sessionID: number) {
    await ValueKeyToPathModel.destroy({where: {sessionID: sessionID}});
}