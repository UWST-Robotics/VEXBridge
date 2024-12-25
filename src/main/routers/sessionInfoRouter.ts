import {Router} from "express";
import ntValuesRouter from "./ntValuesRouter.ts";
import requireSessionID from "../common/requireSessionID.ts";
import sessionService from "../services/SessionService.ts";

const sessionInfoRouter = Router({mergeParams: true});
export default sessionInfoRouter;

sessionInfoRouter.post("/", async (_, res) => {

    // Start a new session
    const sessionInfo = await sessionService.startSession();
    res.json(sessionInfo);
});

sessionInfoRouter.get("/active", (_, res) => {

    // Get the active session
    const activeSession = sessionService.getActiveSession();
    res.json(activeSession);
});

sessionInfoRouter.get("/list", async (_, res) => {

    // Get all session infos
    const sessionInfos = await sessionService.getAllSessionInfos();
    res.json(sessionInfos);
});

sessionInfoRouter.use("/:sessionID/values", ntValuesRouter);
sessionInfoRouter.get("/:sessionID", async (req, res) => {

    // Get the session ID from the URL
    const sessionID = requireSessionID(req, res);
    if (sessionID === null)
        return;

    // Get the session
    const sessionInfo = await sessionService.getSessionInfo(sessionID);
    res.json(sessionInfo);
});