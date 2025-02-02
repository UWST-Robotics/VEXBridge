import Chalk from "chalk";
import socketService from "./services/SocketService.ts";
import webService from "./services/WebService.ts";
import serialPollingService from "./services/serial/SerialPollingService.ts";
import serialConnectionService from "./services/serial/SerialConnectionService.ts";

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
