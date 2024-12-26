import express from "express";
import http from "http";
import {HTTP_PORT} from "../common/Constants.ts";
import Logger from "../common/Logger.ts";
import bodyParser from "body-parser";
import serialRouter from "../routers/serialRouter.ts";
import rootRouter from "../routers/rootRouter.ts";
import ntRouter from "../routers/ntRouter.ts";
import logRouter from "../routers/logRouter.ts";

/**
 * Manages HTTP requests and responses.
 */
export class WebService {
    app = express();
    httpServer = http.createServer(this.app);

    constructor() {
        // Middleware
        this.app.use(bodyParser.json());
        this.app.use((req, _, next) => {
            // Log all incoming requests
            Logger.info(`${req.method}  ${req.path}`);
            next();
        });

        // Routers
        this.app.use("/api/v1/log", logRouter);
        this.app.use("/api/v1/values", ntRouter);
        this.app.use("/api/v1/serial", serialRouter);
        this.app.use("/", rootRouter);
    }

    startListening() {
        this.httpServer.listen(HTTP_PORT, () => {
            Logger.info(`Web server listening on port ${HTTP_PORT}`);
        });
    }
}

const webService = new WebService();
export default webService;