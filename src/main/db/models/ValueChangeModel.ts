import {DataTypes, Model} from "sequelize";
import SessionValueChange from "../../../types/db/SessionValueChange.ts";
import dbService from "../../services/db/DBService.ts";

export default class ValueChangeModel extends Model implements SessionValueChange {
    declare valueChangeID: number;
    declare sessionID: number;
    declare timestamp: Date;
    declare key: number;
    declare newValue: string;
}

ValueChangeModel.init({
    valueChangeID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    sessionID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    key: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    newValue: DataTypes.BLOB
}, {
    sequelize: dbService.sequalize,
    modelName: "sessionValueChange"
});