import SerialState from "../../types/SerialState.ts";
import RobotState from "../../types/RobotState.ts";
import {mainWindow} from "../main.ts";

export default class StateManager {
    static serialState: SerialState = {isConnected: false};
    static robotState: RobotState = {isEnabled: false};

    static updateSerialState(stateChange: Partial<SerialState>) {
        this.serialState = {...this.serialState, ...stateChange};
        mainWindow?.webContents.send("onSerialState", this.serialState);
    }

    static updateRobotState(stateChange: Partial<RobotState>) {
        this.robotState = {...this.robotState, ...stateChange};
        mainWindow?.webContents.send("onRobotState", this.robotState);
    }
}