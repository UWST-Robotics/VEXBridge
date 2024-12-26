import Chalk from "chalk";
import socketService from "./services/SocketService.ts";
import webService from "./services/WebService.ts";
import ntService from "./services/NTService.ts";
import serialPollingService from "./services/serial/SerialPollingService.ts";
import serialConnectionService from "./services/serial/SerialConnectionService.ts";
import logService from "./services/LogService.ts";
import resetService from "./services/ResetService.ts";

// Suppress warning about 'epoll' on non-Linux platforms
if (process.platform !== "linux")
    console.log(Chalk.italic(Chalk.green("^^^ The above warning regarding the use of 'epoll' is expected and can be safely ignored.")));

function init() {
    webService.startListening();
    socketService.init();
    serialPollingService.init();
    serialConnectionService.init();
}

init();

ntService.setPathForKey(1, "_poses/a/x");
ntService.setPathForKey(2, "_poses/a/y");

let t = 0;
const TIME_SCALE = 0.05;
const DATA_SCALE = 50;

setInterval(async () => {
    t++;
    ntService.updateValue(1, Math.sin(t * TIME_SCALE) * DATA_SCALE);
    ntService.updateValue(2, Math.cos(t * TIME_SCALE) * DATA_SCALE);

    if (Math.random() < 0.5)
        logService.log(`Random log message: ${logService.getCurrentLog().length}\n`);
    if (Math.random() < 0.2) {
        resetService.reset();
        ntService.setPathForKey(1, "_poses/a/x");
        ntService.setPathForKey(2, "_poses/a/y");
    }
}, 10);

