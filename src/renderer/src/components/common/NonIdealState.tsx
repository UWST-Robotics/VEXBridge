import React from "react";
import {Box, Typography} from "@mui/material";

export interface NonIdealStateProps {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
}

export default function NonIdealState(props: NonIdealStateProps) {
    const {icon, title, description} = props;

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}
        >
            {icon && (
                <Box color={"text.disabled"}>
                    {icon}
                </Box>
            )}
            {title && (
                <Typography
                    variant={"h6"}
                    color={"text.disabled"}
                    sx={{
                        textAlign: "center"
                    }}
                    style={{
                        marginBottom: 2
                    }}
                >
                    {title}
                </Typography>
            )}
            {description && (
                <Typography
                    variant={"body2"}
                    color={"text.disabled"}
                    sx={{
                        textAlign: "center"
                    }}
                >
                    {description}
                </Typography>
            )}
        </Box>
    );
}