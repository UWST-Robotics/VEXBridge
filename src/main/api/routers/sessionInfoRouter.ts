import {Router} from "express";
import {
    createNewSession,
    getAllSessionInfos,
    getSessionInfo,
    setSessionLabel
} from "../../db/services/SessionInfoDB.ts";
import valueChangeRouter from "./valueChangeRouter.ts";
import requireSessionID from "../utils/requireSessionID.ts";
import valueKeyToPathRouter from "./valueKeyToPathRouter.ts";
import localNetworkTables from "../../nt/localNetworkTables.ts";

const sessionInfoRouter = Router({mergeParams: true});
export default sessionInfoRouter;

sessionInfoRouter.post("/", async (_, res) => {

    // Start a new session
    const sessionId = await createNewSession();
    res.json({sessionId: sessionId});
});

sessionInfoRouter.get("/active", async (_, res) => {
    const currentSessionID = localNetworkTables.currentSessionID;
    if (currentSessionID === undefined) {
        res.status(404).send("No session started");
        return;
    }

    const session = await getSessionInfo(currentSessionID);
    if (!session) {
        res.status(404).send("Session not found");
        return;
    }

    res.json(session);
});

sessionInfoRouter.get("/list", async (_, res) => {
    const sessions = await getAllSessionInfos();
    res.json(sessions);
});

sessionInfoRouter.use("/:sessionID/values", valueChangeRouter);
sessionInfoRouter.use("/:sessionID/valueKeys", valueKeyToPathRouter);
sessionInfoRouter.get("/:sessionID", async (req, res) => {

    // Get the session ID from the URL
    const sessionID = requireSessionID(req, res);
    if (sessionID === null)
        return;

    // Get the session from the database
    const session = await getSessionInfo(sessionID);
    if (!session) {
        res.status(404).send("Session not found");
        return;
    }

    res.json(session);
});
sessionInfoRouter.put("/:sessionID", async (req, res) => {

    // Get the session ID from the URL
    const sessionID = requireSessionID(req, res);
    if (sessionID === null)
        return;

    // Get the label from the request body
    const label = req.body.label;

    // Update the session label
    await setSessionLabel(sessionID, label);

    res.send("Session updated");
});