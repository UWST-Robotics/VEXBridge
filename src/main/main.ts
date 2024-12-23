import {initDB} from "./db/localSQLInstance.ts";
import {initWebServer} from "./api/localExpressApp.ts";
import {initSocketServer} from "./socket/localSocketServer.ts";

async function init() {
    await initDB();
    await initWebServer();
    initSocketServer();
}

init().catch((err) => {
    console.error(err);
    process.exit(1);
});