import {Sequelize} from "sequelize";
import {SQLITE_DB_PATH} from "../common/Constants.ts";

// SQLite database
const localSQLInstance = new Sequelize({
    dialect: "sqlite",
    storage: SQLITE_DB_PATH,
    logQueryParameters: false,
    logging: false
});

export default localSQLInstance;

export async function initDB() {
    await localSQLInstance.sync();
}