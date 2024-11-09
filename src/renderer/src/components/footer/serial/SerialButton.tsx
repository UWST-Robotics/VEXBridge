import {Button} from "@mui/material";
import {SettingsInputHdmi} from "@mui/icons-material";
import React from "react";
import SerialPopover from "./SerialPopover.tsx";
import useSerialState from "../../../hooks/serialPorts/useSerialState";

export default function SerialButton() {
    const {isConnected, port} = useSerialState();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    return (
        <>
            <Button
                size={"small"}
                variant={"text"}
                sx={{
                    color: isConnected ? "inherit" : "text.secondary"
                }}
                startIcon={
                    <SettingsInputHdmi
                        fontSize={"small"}
                        color={"inherit"}
                    />
                }
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {isConnected ? port : "Disconnected"}
            </Button>

            <SerialPopover
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            />
        </>
    );
}