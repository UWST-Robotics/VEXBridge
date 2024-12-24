import {Router} from "express";
import serialServer from "../../serial/localSerialInstance.ts";
import getAvailableSerialPorts from "../../serial/utils/getAvailableSerialPorts.ts";

const serialRouter = Router();
export default serialRouter;

serialRouter.get("/", async (_, res) => {
    res.json(serialServer.getState());
});

serialRouter.post("/open", async (req, res) => {
    const serialPath = req.body.path;
    if (typeof serialPath !== "string") {
        res.status(400).send("Invalid serial path");
        return;
    }

    await serialServer.connect(serialPath);
});

serialRouter.post("/close", async (_, res) => {
    serialServer.close();

    res.send("Serial port closed");
});

serialRouter.get("/list", async (_, res) => {
    const serialPorts = await getAvailableSerialPorts();
    res.json(serialPorts);
});