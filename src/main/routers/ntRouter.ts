import {Router} from "express";
import ntService from "../services/NTService.ts";

const ntRouter = Router();
export default ntRouter;

ntRouter.get("/", (_, res) => {

    // Get the value keys from the database
    const allValues = ntService.getAllValues();
    res.json(allValues);
});

ntRouter.get("/paths", (_, res) => {

    // Get the value keys from the database
    const allPaths = ntService.getAllPaths();
    res.json(allPaths);
});