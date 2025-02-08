import express, {Router} from "express";

const rootRouter = Router();
export default rootRouter;

rootRouter.use(express.static(__dirname));