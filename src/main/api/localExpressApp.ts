import express from "express";
import Logger from "../common/Logger.ts";
import sessionInfoRouter from "./routers/sessionInfoRouter.ts";
import rootRouter from "./routers/rootRouter.ts";
import bodyParser from "body-parser";
import http from "http";
import {HTTP_PORT} from "../common/Constants.ts";
import serialRouter from "./routers/serialRouter.ts";

// Express App
const localExpressApp = express();
export default localExpressApp;

// HTTP Server (for socket.io)
export const httpServer = http.createServer(localExpressApp);

// Middleware
localExpressApp.use(bodyParser.json());
localExpressApp.use((req, _, next) => {
    // Log all incoming requests
    Logger.info(`${req.method}  ${req.path}`);
    next();
});

// Routers
localExpressApp.use("/api/sessions", sessionInfoRouter);
localExpressApp.use("/api/serial", serialRouter);
localExpressApp.use("/", rootRouter);

// Start the web server
export async function initWebServer() {
    httpServer.listen(HTTP_PORT, () => {
        Logger.info(`Web server listening on port ${HTTP_PORT}`);
    });
}