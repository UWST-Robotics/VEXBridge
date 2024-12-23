import {Router} from "express";
import {getAllSessions, getSession, setSessionLabel, startNewSession} from "../../db/services/SessionInfoService.ts";
import valueChangeRouter from "./valueChangeRouter.ts";
import requireSessionID from "../utils/requireSessionID.ts";
import valueKeyToPathRouter from "./valueKeyToPathRouter.ts";

const sessionInfoRouter = Router({mergeParams: true});
export default sessionInfoRouter;

sessionInfoRouter.use("/:sessionID/values", valueChangeRouter);
sessionInfoRouter.use("/:sessionID/valueKeys", valueKeyToPathRouter);

sessionInfoRouter.get("/", async (_, res) => {
    const sessions = await getAllSessions();
    res.json(sessions);
});


sessionInfoRouter.post("/", async (_, res) => {

    // Start a new session
    const sessionId = await startNewSession();
    res.json({sessionId: sessionId});
});

sessionInfoRouter.get("/:sessionID", async (req, res) => {

    // Get the session ID from the URL
    const sessionID = requireSessionID(req, res);
    if (sessionID === null)
        return;

    // Get the session from the database
    const session = await getSession(sessionID);
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