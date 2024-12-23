import {DataTypes, Model} from "sequelize";
import SessionValueChange from "../../../types/db/SessionValueChange.ts";
import localSQLInstance from "../localSQLInstance.ts";

export default class ValueChangeModel extends Model implements SessionValueChange {
    public valueChangeID!: number;
    public sessionID!: number;
    public timestamp!: Date;
    public key!: number;
    public newValue!: string;
}

ValueChangeModel.init({
    valueChangeID: {
        type: DataTypes.BIGINT,
        allowNull: false,
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
    newValue: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: localSQLInstance,
    modelName: "sessionValueChange"
});