import SessionInfoModel from "../models/SessionInfoModel.ts";

export async function startNewSession(label?: string) {
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

export async function getAllSessions() {
    return await SessionInfoModel.findAll();
}

export async function getSession(sessionID: number) {
    return await SessionInfoModel.findByPk(sessionID);
}