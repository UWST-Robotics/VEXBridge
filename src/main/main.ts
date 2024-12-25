import {initDB} from "./db/localSQLInstance.ts";
import {initWebServer} from "./api/localExpressApp.ts";
import {initSocketServer} from "./socket/localSocketServer.ts";
import localNetworkTables from "./nt/localNetworkTables.ts";
import Logger from "./common/Logger.ts";
import Chalk from "chalk";

// Suppress warning about 'epoll' on non-Linux platforms
if (process.platform !== "linux")
    console.log(Chalk.italic(Chalk.green("^^^ The above warning regarding the use of 'epoll' is expected and can be safely ignored.")));

async function init() {
    await initDB();
    await initWebServer();
    initSocketServer();
}

init().catch((err) => {
    console.error(err);
    process.exit(1);
});


localNetworkTables.setPathForKey(1, "_poses/a/x").catch(Logger.error);
localNetworkTables.setPathForKey(2, "_poses/a/y").catch(Logger.error);

setInterval(() => {
    localNetworkTables.updateValue(1, Math.random() * 50 - 25).catch(Logger.error);
    localNetworkTables.updateValue(2, Math.random() * 50 - 25).catch(Logger.error);
}, 1000);