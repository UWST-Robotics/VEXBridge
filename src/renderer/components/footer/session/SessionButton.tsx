import {Button} from "@mui/material";
import {SettingsInputHdmi} from "@mui/icons-material";
import React from "react";
import useCurrentSessionID from "../../../hooks/sessionID/useCurrentSessionID.ts";
import useActiveSessionInfo from "../../../hooks/sessionID/useActiveSessionInfo.ts";
import SessionPopover from "./SessionPopover.tsx";

export default function SessionButton() {
    const activeSessionInfo = useActiveSessionInfo();
    const [currentSessionID] = useCurrentSessionID();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const isCurrentSession = activeSessionInfo?.sessionID === currentSessionID;

    return (
        <>
            <Button
                size={"small"}
                variant={"text"}
                color={isCurrentSession ? "success" : "error"}
                startIcon={
                    <SettingsInputHdmi
                        fontSize={"small"}
                        color={"inherit"}
                    />
                }
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {isCurrentSession ? "Latest" : `Session ${activeSessionInfo?.sessionID}`}
            </Button>

            <SessionPopover
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            />
        </>
    );
}