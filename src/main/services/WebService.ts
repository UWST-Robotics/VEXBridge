import express from "express";
import http from "http";
import bodyParser from "body-parser";
import serialRouter from "../routers/serialRouter.ts";
import rootRouter from "../routers/rootRouter.ts";
import ntPathsRouter from "../routers/ntPathsRouter.ts";
import logRouter from "../routers/logRouter.ts";
import ntValuesRouter from "../routers/ntValuesRouter.ts";
import logger from "../common/Logger.ts";
import settingsService from "./SettingsService.ts";

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
            logger.verbose(`${req.method}  ${req.path}`);
            next();
        });

        // Routers
        this.app.use("/api/v1/log", logRouter);
        this.app.use("/api/v1/values", ntValuesRouter);
        this.app.use("/api/v1/paths", ntPathsRouter);
        this.app.use("/api/v1/serial", serialRouter);
        this.app.use("/", rootRouter);
    }

    startListening() {
        const {port} = settingsService.get();
        this.httpServer.listen(port, () => {
            logger.info(`Web server listening on port ${port}`);
        });
    }
}

const webService = new WebService();
export default webService;