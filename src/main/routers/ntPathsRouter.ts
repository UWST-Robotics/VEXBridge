import {Router} from "express";
import ntService from "../services/NTService.ts";

const ntPathsRouter = Router();
export default ntPathsRouter;

ntPathsRouter.get("/", (_, res) => {

    // Get the value keys from the database
    const allPaths = ntService.getAllPaths();
    res.json(allPaths);
});