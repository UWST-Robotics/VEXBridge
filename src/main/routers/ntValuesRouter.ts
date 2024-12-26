import {Router} from "express";
import ntService from "../services/NTService.ts";

const ntValuesRouter = Router();
export default ntValuesRouter;

ntValuesRouter.get("/", (_, res) => {

    // Get the value keys from the database
    const allValues = ntService.getAllValues();
    res.json(allValues);
});