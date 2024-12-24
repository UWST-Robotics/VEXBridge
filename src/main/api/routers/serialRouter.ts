import {Router} from "express";
import serialServer from "../../serial/localSerialInstance.ts";
import getAvailableSerialPorts from "../../serial/utils/getAvailableSerialPorts.ts";

const serialRouter = Router();
export default serialRouter;

serialRouter.get("/", async (_, res) => {
    res.json(serialServer.getState());
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

    serialServer.connectionService.enableAutoSelect(autoSelect);
    serialServer.connectionService.setTargetPath(serialPath);

    res.send("OK");
});

serialRouter.get("/list", async (_, res) => {
    const serialPorts = await getAvailableSerialPorts();
    res.json(serialPorts);
});