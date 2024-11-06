import {Button} from "@mui/material";
import {SettingsInputHdmi} from "@mui/icons-material";
import React from "react";
import SerialPopover from "./SerialPopover.tsx";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";
import {SERVER_GROUP} from "../../../types/GroupNames.ts";

export default function SerialButton() {
    const isConnected = useNTValue(SERVER_GROUP + "/isSerialConnected");
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    return (
        <>
            <Button
                size={"small"}
                variant={"text"}
                color={"inherit"}
                startIcon={
                    <SettingsInputHdmi
                        fontSize={"small"}
                        color={"inherit"}
                    />
                }
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {isConnected ? "Connected" : "Disconnected"}
            </Button>

            <SerialPopover
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            />
        </>
    );
}