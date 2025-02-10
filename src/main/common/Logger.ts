import {createLogger, format, transports} from "winston";


const logger = createLogger({
    level: "debug",
    format: format.combine(
        format.colorize(),
        format.simple()
    ),
    transports: [
        new transports.Console()
    ]
});
export default logger;