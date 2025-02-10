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

// let key = 1;
//
// function test(name: string, offset: number) {
//     const thisKey = key++;
//     ntService.setPathForKey(thisKey, name);
//     let t = 0;
//     setInterval(() => {
//         t++;
//         ntService.updateValue(thisKey, Math.cos(t * 0.05 + offset) * 48);
//     }, 50);
// }
//
// test("_poses/a/x", 0);
// test("_poses/a/y", 1);
// test("_poses/Odom2/x", 2);
// test("_poses/Odom2/y", 3);
// test("_hardware/LeftMotor/position", 2);
