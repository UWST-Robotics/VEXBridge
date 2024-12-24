import {Button} from "@mui/material";
import {SettingsInputHdmi} from "@mui/icons-material";
import React from "react";
import SerialPopover from "./SerialPopover.tsx";
import useSerialState from "../../../hooks/serialPorts/useSerialState.ts";

export default function SerialButton() {
    const {isOpen, port} = useSerialState();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    return (
        <>
            <Button
                size={"small"}
                variant={"text"}
                color={isOpen ? "success" : "error"}
                startIcon={
                    <SettingsInputHdmi
                        fontSize={"small"}
                        color={"inherit"}
                    />
                }
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {isOpen ? port : "Disconnected"}
            </Button>

            <SerialPopover
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            />
        </>
    );
}