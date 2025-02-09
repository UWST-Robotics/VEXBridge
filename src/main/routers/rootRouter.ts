import express, {Router} from "express";
import {fileURLToPath} from 'url';
import {dirname} from "path";

const rootRouter = Router();
export default rootRouter;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
rootRouter.use(express.static(__dirname));