import {Instance} from "chalk";
import {mainWindow} from "../main.ts";

// Limit to ANSI 256 colors
const Chalk = new Instance({level: 2});


/**
 * Logger class for logging messages to the console and the client
 */
export default class Logger {
    static log(text: string) {
        console.log(text);

        try {
            mainWindow?.webContents.send("onLog", text + "\n");
        } catch {
            // Ignore
        }
    }

    static error(error: string) {
        Logger.log(Chalk.bgRed("[ERROR]") + " " + Chalk.red(error));
    }

    static info(info: string) {
        Logger.log(Chalk.blue("[INFO]") + " " + info);
    }

    static client(info: string) {
        Logger.log(Chalk.yellow("[CLIENT]") + " " + info);
    }
}