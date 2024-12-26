import {Typography} from "@mui/material";
import React from "react";

export interface FullscreenModalProps {
    isVisible: boolean;
    title: string;
    message: string;
    icon: React.ReactNode;
}

export default function FullscreenModal(props: FullscreenModalProps) {

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
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(3px)",
                zIndex: 1400,

                transition: "opacity 0.3s",
                opacity: props.isVisible ? 1 : 0,
                pointerEvents: props.isVisible ? "auto" : "none",
            }}
        >
            {props.icon}
            <Typography
                variant={"h4"}
                color={"text.primary"}
                sx={{textAlign: "center"}}
            >
                {props.title}
            </Typography>
            <Typography
                variant={"body1"}
                color={"text.secondary"}
                sx={{textAlign: "center"}}
            >
                {props.message}
            </Typography>
        </div>
    )
}