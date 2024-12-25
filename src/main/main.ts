import Logger from "./common/Logger.ts";
import Chalk from "chalk";
import socketService from "./services/SocketService.ts";
import webService from "./services/WebService.ts";
import dbService from "./services/db/DBService.ts";
import ntValueService from "./services/nt/NTValueService.ts";
import ntKeyPathService from "./services/nt/NTKeyPathService.ts";

// Suppress warning about 'epoll' on non-Linux platforms
if (process.platform !== "linux")
    console.log(Chalk.italic(Chalk.green("^^^ The above warning regarding the use of 'epoll' is expected and can be safely ignored.")));

async function init() {
    await dbService.init();
    webService.startListening();
    socketService.init();
}

init().catch((err) => {
    console.error(err);
    process.exit(1);
});


ntKeyPathService.setPathForKey(1, "_poses/a/x").catch(Logger.error);
ntKeyPathService.setPathForKey(2, "_poses/a/y").catch(Logger.error);

setInterval(() => {
    ntValueService.updateValue(1, Math.random() * 50 - 25).catch(Logger.error);
    ntValueService.updateValue(2, Math.random() * 50 - 25).catch(Logger.error);
}, 1000);