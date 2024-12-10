import useCurrentTab from "../../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import useLog from "../../../hooks/log/useLog.ts";
import Ansi from "ansi-to-react";
import React from "react";

export default function LogOutputPage() {
    const [currentTab] = useCurrentTab();
    const logText = useLog();
    const scrollRef = React.useRef<HTMLDivElement>(null);

    // Always scroll to the bottom when the log changes
    if (scrollRef.current)
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

    if (currentTab !== "log")
        return null;
    return (
        <Box
            ref={scrollRef}
            sx={{
                backgroundColor: "black",
                fontFamily: "'Lucida Console', Monaco, monospace !important",
                whiteSpace: "break-spaces",
                overflowY: "auto",
                minHeight: "100%",
                maxHeight: "100%",
            }}
        >
            <Box sx={{padding: 2}}>
                <Ansi>
                    {logText}
                </Ansi>
            </Box>
        </Box>
    );
}