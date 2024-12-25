import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {History, Star} from "@mui/icons-material";
import SessionInfo from "../../../../types/db/SessionInfo.ts";
import useActiveSessionInfo from "../../../hooks/sessionID/useActiveSessionInfo.ts";
import useCurrentSessionID from "../../../hooks/sessionID/useCurrentSessionID.ts";

export interface SessionPopoverOptionProps {
    sessionInfo: SessionInfo;
}

export default function SessionPopoverOption(props: SessionPopoverOptionProps) {
    const activeSessionInfo = useActiveSessionInfo();
    const [currentSessionID] = useCurrentSessionID();

    const isCurrentSession = activeSessionInfo?.sessionID === currentSessionID;
    const isActiveSession = activeSessionInfo?.sessionID === props.sessionInfo.sessionID;

    return (
        <ListItem disablePadding>
            <ListItemButton
                dense
                selected={isActiveSession}
                onClick={() => {
                }}
            >
                <ListItemIcon sx={{minWidth: 40}}>
                    {isCurrentSession ? (
                        <Star
                            color={isActiveSession ? "inherit" : "disabled"}
                        />
                    ) : (
                        <History
                            color={isActiveSession ? "inherit" : "disabled"}
                        />
                    )}
                </ListItemIcon>
                <ListItemText
                    primary={props.sessionInfo.label || `Session ${props.sessionInfo.sessionID}`}
                    secondary={props.sessionInfo.startTimestamp.toString()}
                />
            </ListItemButton>
        </ListItem>
    );
}