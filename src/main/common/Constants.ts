export const HTTP_PORT = process.env.PORT || 3000; // 3000
export const RTS_PIN = parseInt(process.env.RTS_PIN || "17"); // GPIO 17
export const SERIAL_POLLING_INTERVAL = parseInt(process.env.SERIAL_POLLING_INTERVAL || "500"); // 500 ms
export const BAUD_RATE = parseInt(process.env.BAUD_RATE || "115200"); // 115200 baud
export const MAX_LOG_MEMORY = parseInt(process.env.MAX_LOG_MEMORY || "10000"); // 10000 characters