import {Button} from "@mui/material";
import React from "react";
import {Battery20, Battery30, Battery50, Battery60, Battery80, Battery90, BatteryFull} from "@mui/icons-material";
import BatteryPopover from "./BatteryPopover.tsx";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";
import {ROBOT_GROUP} from "../../../types/GroupNames.ts";

const MAX_VOLTAGE = 13500;
const MIN_VOLTAGE = 11000;

export default function BatteryButton() {
    const batteryVoltage = useNTValue(ROBOT_GROUP + "/batteryVoltage");
    const batteryCurrent = useNTValue(ROBOT_GROUP + "/batteryCurrent");
    const batteryTemperature = useNTValue(ROBOT_GROUP + "/batteryTemperature");
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    // Calculate battery percentage
    let batteryPercent = (Number(batteryVoltage) - MIN_VOLTAGE) / (MAX_VOLTAGE - MIN_VOLTAGE);
    batteryPercent *= 100;
    batteryPercent = Math.max(0, Math.min(100, batteryPercent));

    if (isNaN(batteryPercent))
        return null;
    return (
        <>
            <Button
                size={"small"}
                variant={"text"}
                color={"inherit"}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {batteryPercent > 90 && <BatteryFull fontSize={"small"}/>}
                {batteryPercent > 80 && batteryPercent <= 90 && <Battery90 fontSize={"small"}/>}
                {batteryPercent > 60 && batteryPercent <= 80 && <Battery80 fontSize={"small"}/>}
                {batteryPercent > 50 && batteryPercent <= 60 && <Battery60 fontSize={"small"}/>}
                {batteryPercent > 30 && batteryPercent <= 50 && <Battery50 fontSize={"small"}/>}
                {batteryPercent > 20 && batteryPercent <= 30 && <Battery30 fontSize={"small"}/>}
                {batteryPercent <= 20 && <Battery20 fontSize={"small"}/>}
            </Button>

            <BatteryPopover
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                batteryPercent={batteryPercent}
                voltage={Number(batteryVoltage)}
                current={Number(batteryCurrent)}
                temperature={Number(batteryTemperature)}
            />
        </>

    );
}