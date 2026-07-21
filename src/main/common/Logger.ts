import {createLogger, format, transports} from "winston";
import settingsService from "../services/SettingsService.ts";
import {settingsChangedEvent} from "./EventHandler.ts";

// Create logger
const logger = createLogger({
    level: settingsService.get().serverLogLevel,
    format: format.combine(
        format.colorize(),
        format.simple()
    ),
    transports: [
        new transports.Console()
    ]
});

// Update log level when settings change
settingsChangedEvent.on((settings) => {
    logger.level = settings.serverLogLevel;
});

export default logger;