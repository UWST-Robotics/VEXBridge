import {Router} from "express";
import getAvailableSerialPorts from "../common/getAvailableSerialPorts.ts";
import serialService from "../services/serial/SerialService.ts";
import serialConnectionService from "../services/serial/SerialConnectionService.ts";

const serialRouter = Router();
export default serialRouter;

serialRouter.get("/", async (_, res) => {
    res.json(serialService.getState());
});

serialRouter.post("/", async (req, res) => {
    const autoSelect = req.body.autoSelect;
    if (typeof autoSelect !== "boolean") {
        res.status(400).send("Invalid auto select value");
        return;
    }

    const serialPath = req.body.serialPath;
    if (typeof serialPath !== "string") {
        res.status(400).send("Invalid serial path");
        return;
    }

    serialConnectionService.enableAutoSelect(autoSelect);
    serialConnectionService.setTargetPath(serialPath);

    res.send("OK");
});

serialRouter.get("/list", async (_, res) => {
    const serialPorts = await getAvailableSerialPorts();
    res.json(serialPorts);
});