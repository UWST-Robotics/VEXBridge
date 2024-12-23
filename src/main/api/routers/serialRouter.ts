import {Router} from "express";
import serialServer from "../../serial/localSerialInstance.ts";
import getAvailableSerialPorts from "../../serial/utils/getAvailableSerialPorts.ts";
import SerialState from "../../../types/serial/SerialState.ts";

const serialRouter = Router();
export default serialRouter;

serialRouter.get("/", async (_, res) => {
    const serialState: SerialState = {
        isOpen: serialServer.hardware?.isOpen ?? false,
        port: serialServer.hardware?.port ?? "N/A",
        path: serialServer.hardware?.path ?? "N/A",
        baudRate: serialServer.hardware?.baudRate ?? -1
    };

    res.json(serialState);
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