import {Router} from "express";
import settingsService from "../services/SettingsService.ts";

const settingsRouter = Router();
export default settingsRouter;

settingsRouter.get("/", async (_, res) => {
    res.json(settingsService.get());
});

settingsRouter.post("/", async (req, res) => {
    const settings = req.body;
    if (!settings) {
        res.status(400).send("Invalid settings");
        return;
    }

    settingsService.set(settings);
    
    res.send("OK");
});