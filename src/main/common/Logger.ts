import Chalk from "chalk";

/**
 * Logger class for logging messages to the console and the client
 */
export default class Logger {
    static log(text: string) {
        console.log(text);
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