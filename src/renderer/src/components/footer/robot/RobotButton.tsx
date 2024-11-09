import {Button} from "@mui/material";
import {SmartToy} from "@mui/icons-material";
import useRobotState from "../../../hooks/robot/useRobotState.ts";
import React from "react";
import RobotPopover from "./RobotPopover.tsx";

export default function RobotButton() {
    const robotState = useRobotState();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    return (
        <>
            <Button
                size={"small"}
                variant={"text"}
                color={"inherit"}
                sx={{color: "text.secondary", marginLeft: 1}}
                startIcon={(<SmartToy/>)}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {robotState.isEnabled ? "Enabled" : "Disabled"}
            </Button>

            <RobotPopover
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                isEnabled={robotState.isEnabled}
                firmwareVersion={"Unknown"}
            />
        </>
    );
}