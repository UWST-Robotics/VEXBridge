import {Router} from "express";
import {getPathForKey, setPathForKey} from "../../db/services/ValueKeyToPathService.ts";
import requireSessionID from "../utils/requireSessionID.ts";

const valueKeyToPathRouter = Router({mergeParams: true});
export default valueKeyToPathRouter;

valueKeyToPathRouter.get("/:valueKey", async (req, res) => {

    // Get the session ID from the URL
    const sessionID = requireSessionID(req, res);
    if (sessionID === null)
        return;

    // Get the value key from the URL
    const valueKey = parseInt(req.params.valueKey);
    if (isNaN(valueKey)) {
        res.status(400).send("Invalid value key");
        return;
    }

    // Get the path from the database
    const path = await getPathForKey(sessionID, valueKey);
    if (!path) {
        res.status(404).send("Path not found");
        return;
    }

    res.json(path);
});

valueKeyToPathRouter.post("/:valueKey", async (req, res) => {

    // Get the session ID from the URL
    const sessionID = requireSessionID(req, res);
    if (sessionID === null)
        return;

    // Get the value key from the URL
    const valueKey = parseInt(req.params.valueKey);
    if (isNaN(valueKey)) {
        res.status(400).send("Invalid value key");
        return;
    }

    // Get the path from the request body
    const path = req.body.path;
    if (typeof path !== "string") {
        res.status(400).send("Invalid path");
        return;
    }

    // Set the path for the value key
    await setPathForKey(sessionID, valueKey, path);

    res.send("Path set");
});