import {Router} from "express";
import ntService from "../services/NTService.ts";

const ntRouter = Router();
export default ntRouter;

ntRouter.get("/", (_, res) => {

    // Get the value keys from the database
    const allValueKeys = ntService.getAllValueKeys();
    res.json(allValueKeys);
});

ntRouter.get("/:valueKey", (req, res) => {

    // Get the value key from the URL
    const valueKey = parseInt(req.params.valueKey);
    if (isNaN(valueKey)) {
        res.status(400).send("Invalid value key");
        return;
    }

    // Get the current value from the database
    const value = ntService.getValueHistory(valueKey);
    if (value === null) {
        res.status(404).send("Value not found");
        return;
    }

    res.json(value);
});