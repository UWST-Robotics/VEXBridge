import {Sequelize} from "sequelize";
import {SQLITE_DB_PATH} from "../../common/Constants.ts";

export class DBService {
    sequalize = new Sequelize({
        dialect: "sqlite",
        storage: SQLITE_DB_PATH,
        logQueryParameters: false,
        logging: false
    });

    /**
     * Initialize the database
     */
    async init() {
        await this.sequalize.sync();
    }
}

const dbService = new DBService();
export default dbService;