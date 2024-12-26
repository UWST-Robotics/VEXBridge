import Chalk from "chalk";
import socketService from "./services/SocketService.ts";
import webService from "./services/WebService.ts";
import ntService from "./services/NTService.ts";

// Suppress warning about 'epoll' on non-Linux platforms
if (process.platform !== "linux")
    console.log(Chalk.italic(Chalk.green("^^^ The above warning regarding the use of 'epoll' is expected and can be safely ignored.")));

function init() {
    webService.startListening();
    socketService.init();
}

init();

ntService.setPathForKey(1, "_poses/a/x");
ntService.setPathForKey(2, "_poses/a/y");

setInterval(async () => {
    ntService.updateValue(1, Math.random() * 50 - 25);
    ntService.updateValue(2, Math.random() * 50 - 25);
}, 1000);

