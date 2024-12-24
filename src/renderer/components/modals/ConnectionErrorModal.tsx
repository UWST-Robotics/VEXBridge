import useSocketStatus from "../../hooks/socket/useSocketStatus.ts";
import {CircularProgress, Typography} from "@mui/material";

export default function ConnectionErrorModal() {
    const socketStatus = useSocketStatus();
    const isVisible = socketStatus !== "connected";

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(2px)",

                transition: "opacity 0.3s",
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? "auto" : "none",
            }}
        >
            <CircularProgress
                size={40}
                color={"inherit"}
                sx={{margin: 1}}
                thickness={6}
            />
            <Typography
                variant={"h4"}
                color={"text.primary"}
                sx={{textAlign: "center"}}
            >
                Connecting...
            </Typography>
            <Typography
                variant={"body1"}
                color={"text.secondary"}
                sx={{textAlign: "center"}}
            >
                Trying to connect to the server. If this takes too long, try refreshing the page.
            </Typography>
        </div>
    )
}