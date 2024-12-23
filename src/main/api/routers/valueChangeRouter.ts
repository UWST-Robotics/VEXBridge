import {Router} from "express";
import {getCurrentValue, getValueChanges, recordValueChange} from "../../db/services/ValueChangeService.ts";
import requireSessionID from "../utils/requireSessionID.ts";
import {getAllPaths} from "../../db/services/ValueKeyToPathService.ts";

const valueChangeRouter = Router({mergeParams: true});
export default valueChangeRouter;

valueChangeRouter.get("/", async (req, res) => {

    // Get the session ID from the URL
    const sessionID = requireSessionID(req, res);
    if (sessionID === null)
        return;

    // Get the value keys from the database
    const valuePaths = await getAllPaths(sessionID);
    res.json(valuePaths);
});

valueChangeRouter.get("/:valueKey", async (req, res) => {

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

    // Get the current value from the database
    const value = await getCurrentValue(sessionID, valueKey);
    if (value === null) {
        res.status(404).send("Value not found");
        return;
    }

    res.json(value);
});

valueChangeRouter.get("/:valueKey/history", async (req, res) => {

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

    // Get the value history from the database
    const valueHistory = await getValueChanges(sessionID, valueKey);
    res.json(valueHistory);
});

valueChangeRouter.post("/:valueKey", async (req, res) => {

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

    // Get the value from the request body
    const value = req.body.value;
    if (value === undefined) {
        res.status(400).send("Value not provided");
        return;
    }

    // Record the value change
    await recordValueChange(sessionID, valueKey, value);

    res.send("Value change recorded");
});