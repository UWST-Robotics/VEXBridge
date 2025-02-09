import express, {Router} from "express";

const rootRouter = Router();
export default rootRouter;

if (process.env.NODE_ENV === "production")
    rootRouter.use(express.static(__dirname));