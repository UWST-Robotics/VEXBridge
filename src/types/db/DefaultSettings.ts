import Settings from "./Settings.ts";

const DefaultSettings: Settings = {
    server: {
        port: 3000,
        maxLogSize: 1000,
        serverLogLevel: "info",

        baudRate: 115200,
        pollInterval: 500,
        defaultPort: "",
        autoConnect: true,

        enableRTS: true,
        gpioRTSPin: 12, // GPIO 18 (physical pin 12)
        gpioPreDelay: 0,
        gpioPostDelay: 1
    },
    client: {}
};
export default DefaultSettings;