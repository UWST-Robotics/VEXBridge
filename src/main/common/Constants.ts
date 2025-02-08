export const HTTP_PORT = process.env.PORT || 3000; // 3000
export const RTS_PIN = parseInt(process.env.RTS_PIN || "12"); // GPIO 18 (physical pin 12)
export const ENABLE_RTS = process.env.ENABLE_RTS === "true"; // true
export const SERIAL_POLLING_INTERVAL = parseInt(process.env.SERIAL_POLLING_INTERVAL || "500"); // 500 ms
export const BAUD_RATE = parseInt(process.env.BAUD_RATE || "115200"); // 115200 baud
export const MAX_LOG_MEMORY = parseInt(process.env.MAX_LOG_MEMORY || "10000"); // 10000 characters
export const GPIO_PRE_DELAY = parseInt(process.env.GPIO_PRE_DELAY || "0"); // ms
export const GPIO_POST_DELAY = parseInt(process.env.GPIO_POST_DELAY || "1"); // ms
export const SERIAL_PORT = process.env.SERIAL_PORT || ""; // ""