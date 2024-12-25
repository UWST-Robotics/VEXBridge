import {Router} from "express";
import requireSessionID from "../common/requireSessionID.ts";
import ntValueService from "../services/nt/NTValueService.ts";
import ntKeyPathService from "../services/nt/NTKeyPathService.ts";

const ntValuesRouter = Router({mergeParams: true});
export default ntValuesRouter;

ntValuesRouter.get("/", async (req, res) => {

    // Get the session ID from the URL
    const sessionID = requireSessionID(req, res);
    if (sessionID === null)
        return;

    // Get the value keys from the database
    const valuePaths = await ntKeyPathService.getAllKeyPaths(sessionID);
    res.json(valuePaths);
});

ntValuesRouter.get("/:valueKey", async (req, res) => {

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
    const value = await ntValueService.getValueHistory(sessionID, valueKey);
    if (value === null) {
        res.status(404).send("Value not found");
        return;
    }

    res.json(value);
});