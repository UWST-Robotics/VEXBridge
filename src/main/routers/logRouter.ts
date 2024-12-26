import {Router} from "express";
import logService from "../services/LogService.ts";

const logRouter = Router();
export default logRouter;

logRouter.get("/", (_, res) => {
    // Get the value keys from the database
    const valuePaths = logService.getCurrentLog();
    res.json(valuePaths);
});

logRouter.post("/", (req, res) => {
    // Get the message from the request body
    const message = req.body.message;
    if (typeof message !== "string") {
        res.status(400).send("Invalid message");
        return;
    }

    // Log the message
    logService.log(message);
    res.send("OK");
})