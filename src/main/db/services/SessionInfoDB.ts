import SessionInfoModel from "../models/SessionInfoModel.ts";

export async function createNewSession(label?: string) {
    const session = await SessionInfoModel.create({
        startTimestamp: new Date(),
        label: label || ""
    });
    return session.sessionID;
}

export async function setSessionLabel(sessionID: number, label: string) {
    await SessionInfoModel.update(
        {label: label},
        {where: {sessionID: sessionID}}
    );
}

export async function getAllSessionInfos() {
    return await SessionInfoModel.findAll();
}

export async function getSessionInfo(sessionID: number) {
    return await SessionInfoModel.findByPk(sessionID);
}

export async function deleteSessionInfo(sessionID: number) {
    await SessionInfoModel.destroy({where: {sessionID: sessionID}});
}