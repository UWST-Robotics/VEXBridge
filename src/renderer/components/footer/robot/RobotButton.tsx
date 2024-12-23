import {Button} from "@mui/material";
import {SmartToy} from "@mui/icons-material";
import useRobotState from "../../../hooks/robot/useRobotState.ts";
import useSerialState from "../../../hooks/serialPorts/useSerialState.ts";

export default function RobotButton() {
    const serialState = useSerialState();
    const robotState = useRobotState();

    if (!serialState.isConnected)
        return null;
    return (
        <Button
            size={"small"}
            variant={"text"}
            color={robotState.isEnabled ? "success" : "error"}
            sx={{marginLeft: 1, cursor: "default"}}
            startIcon={(<SmartToy/>)}
        >
            {robotState.isEnabled ? "Enabled" : "Disabled"}
        </Button>
    );
}