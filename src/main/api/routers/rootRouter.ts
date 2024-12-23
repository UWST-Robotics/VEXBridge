import {Router} from "express";

const rootRouter = Router();
export default rootRouter;

rootRouter.get("/", (_, res) => {
    res.sendFile("index.html", {root: "public"});
});