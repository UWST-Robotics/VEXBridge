import * as fs from "fs";
import DefaultSettings from "../../types/db/DefaultSettings.ts";
import {settingsChangedEvent} from "../common/EventHandler.ts";
import ServerSettings from "../../types/db/ServerSettings.ts";
import logger from "../common/Logger.ts";

const CONFIG_FILE_NAME = "config.json";

/**
 * Manages local server settings
 */
export class SettingsService {
    private settings: ServerSettings = DefaultSettings.server;

    constructor() {
        this.loadFromFile();
    }

    /**
     * Loads all settings from the config file.
     */
    loadFromFile() {
        try {
            // Create config file if it doesn't exist
            const fileExists = fs.existsSync(CONFIG_FILE_NAME);
            if (!fileExists)
                this.saveToFile();

            // Load settings from file
            const data = fs.readFileSync(CONFIG_FILE_NAME, "utf8");
            const settings = JSON.parse(data);
            this.set(settings);
        } catch (e) {
            logger.error(`Failed to load settings from ${CONFIG_FILE_NAME}: ${e}`);
        }
    }

    /**
     * Saves all settings to the config file
     */
    saveToFile() {
        try {
            fs.writeFileSync(CONFIG_FILE_NAME, JSON.stringify(this.settings, null, 4));
        } catch (e) {
            logger.error(`Failed to save settings to ${CONFIG_FILE_NAME}: ${e}`);
        }
    }

    /**
     * Gets the current server settings.
     * Use the settingsChangedEvent to listen for changes.
     * @returns The current server settings
     */
    get(): ServerSettings {
        return this.settings;
    }

    /**
     * Updates the server settings and emits a settings changed event.
     * @param settings - New server settings
     */
    set(settings: ServerSettings) {
        // Merge settings with defaults/old settings
        this.settings = {
            ...DefaultSettings.server,
            ...this.settings,
            ...settings
        };

        // Emit settings changed event
        settingsChangedEvent.emit(this.settings);

        // Save settings to filesystem
        this.saveToFile();
    }
}

const settingsService = new SettingsService();
export default settingsService;