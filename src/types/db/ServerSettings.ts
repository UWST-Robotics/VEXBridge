export default interface ServerSettings {
    // HTTP
    port: number;

    // Log
    maxLogSize: number;
    serverLogLevel: string;

    // Serial
    baudRate: number;
    pollInterval: number;
    defaultPort: string;
    autoConnect: boolean;

    // GPIO
    enableRTS: boolean;
    gpioRTSPin: number;
    gpioPreDelay: number;
    gpioPostDelay: number;
};

export const DefaultServerSettings: ServerSettings = {
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
};