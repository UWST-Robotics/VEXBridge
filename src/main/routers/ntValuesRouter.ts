import {Router} from "express";
import ntService from "../services/NTService.ts";
import valueUpdateQueueService from "../services/ValueUpdateQueueService.ts";

const ntValuesRouter = Router();
export default ntValuesRouter;

ntValuesRouter.get("/", (_, res) => {

    // Get the value keys from the database
    const allValues = ntService.getAllValues();
    res.json(allValues);
});

ntValuesRouter.post("/", (req, res) => {

    // Get path and value from request body
    const path = req.query.path as string | undefined;
    if (!path) {
        res.status(400).send("Path is required");
        return;
    }

    const value = req.query.value as string | undefined;
    if (!value) {
        res.status(400).send("Value is required");
        return;
    }

    // Search for id from path
    const key = ntService.getKeyForPath(path);
    if (key === undefined) {
        res.status(404).send("Path not found");
        return;
    }

    // Update value
    ntService.updateValue(key, value);

    // Write value to serial port
    valueUpdateQueueService.updateValue(key, value);
    res.send("OK");
});