import {Button} from "@mui/material";
import {SettingsInputHdmi} from "@mui/icons-material";
import React from "react";
import SerialPopover from "./SerialPopover.tsx";
import useSerialState from "../../../hooks/serialPorts/useSerialState.ts";

export default function SerialButton() {
    const serialState = useSerialState();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    return (
        <>
            <Button
                size={"small"}
                variant={"text"}
                color={serialState?.isOpen ? "success" : "error"}
                startIcon={
                    <SettingsInputHdmi
                        fontSize={"small"}
                        color={"inherit"}
                    />
                }
                sx={{paddingRight: 1, paddingLeft: 1}}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {serialState?.isOpen ? serialState.path : "Disconnected"}
            </Button>

            <SerialPopover
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            />
        </>
    );
}