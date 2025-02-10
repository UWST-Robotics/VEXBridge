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