export const HTTP_PORT = process.env.PORT || 3000;
export const RTS_PIN = parseInt(process.env.RTS_PIN || "17");
export const SERIAL_POLLING_INTERVAL = parseInt(process.env.SERIAL_POLLING_INTERVAL || "500");
export const BAUD_RATE = parseInt(process.env.BAUD_RATE || "115200");
export const MAX_VALUE_MEMORY = parseInt(process.env.MAX_VALUE_MEMORY || "10000"); // 10000 * 8 bytes = 800 KB