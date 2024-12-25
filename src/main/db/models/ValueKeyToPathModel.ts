import {DataTypes, Model} from "sequelize";
import SessionKeyToPath from "../../../types/db/SessionKeyToPath.ts";
import localSQLInstance from "../localSQLInstance.ts";

export default class ValueKeyToPathModel extends Model implements SessionKeyToPath {
    declare sessionID: number;
    declare key: number;
    declare path: string;
}

ValueKeyToPathModel.init({
    sessionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: localSQLInstance,
    modelName: "sessionKeyToPath"
});