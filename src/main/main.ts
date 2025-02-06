import socketService from "./services/SocketService.ts";
import webService from "./services/WebService.ts";
import serialPollingService from "./services/serial/SerialPollingService.ts";
import serialConnectionService from "./services/serial/SerialConnectionService.ts";

function init() {
    webService.startListening();
    socketService.init();
    serialPollingService.init();
    serialConnectionService.init();
}

init();
