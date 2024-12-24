export const HEARTBEAT_INTERVAL = 600;
export const HTTP_PORT = process.env.PORT || 3000;
export const SQLITE_DB_PATH = process.env.SQLITE_DB_PATH || "db.sqlite";
export const RTS_PIN = parseInt(process.env.RTS_PIN || "17");
export const SERIAL_POLLING_INTERVAL = parseInt(process.env.SERIAL_POLLING_INTERVAL || "500");