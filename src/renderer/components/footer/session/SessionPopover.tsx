import {List, Popover, Skeleton, Typography} from "@mui/material";
import useSessionList from "../../../hooks/sessionID/useSessionList.ts";
import SessionPopoverOption from "./SessionPopoverOption.tsx";

export interface SerialPopoverProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;
}

export default function SessionPopover(props: SerialPopoverProps) {
    const sessionList = useSessionList();
    const {anchorEl, onClose} = props;

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorPosition={{top: 0, left: 0}}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
        >
            <List>
                {sessionList?.map((sessionInfo) => (
                    <SessionPopoverOption
                        key={sessionInfo.sessionID}
                        sessionInfo={sessionInfo}
                    />
                ))}

                {sessionList === undefined && (
                    <Skeleton
                        width={300}
                        height={24}
                        variant={"rectangular"}
                        animation={"wave"}
                        sx={{margin: 1}}
                    />
                )}

                {sessionList?.length === 0 && (
                    <Typography
                        sx={{
                            margin: 1,
                            paddingLeft: 2,
                            paddingRight: 2,
                            color: "text.disabled"
                        }}
                    >
                        No sessions found
                    </Typography>
                )}
            </List>
        </Popover>
    );
}