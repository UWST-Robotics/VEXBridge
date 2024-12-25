import {DataTypes, Model} from "sequelize";
import SessionInfo from "../../../types/db/SessionInfo.ts";
import localSQLInstance from "../localSQLInstance.ts";

export default class SessionInfoModel extends Model implements SessionInfo {
    declare sessionID: number;
    declare startTimestamp: Date;
    declare label: string;
}

SessionInfoModel.init({
    sessionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    startTimestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: localSQLInstance,
    modelName: "sessionInfo"
});