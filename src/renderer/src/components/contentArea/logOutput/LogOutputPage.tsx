import useCurrentTab from "../../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import useLog from "../../../hooks/log/useLog.ts";
import Ansi from "ansi-to-react";

export default function LogOutputPage() {
    const [currentTab] = useCurrentTab();
    const logText = useLog();

    if (currentTab !== "log")
        return null;
    return (
        <Box
            sx={{
                padding: 2,
                overflowY: "auto"
            }}
        >
            <Box
                sx={{
                    padding: 2,
                    backgroundColor: "black",
                    fontFamily: "'Lucida Console', Monaco, monospace !important",
                    whiteSpace: "pre"
                }}
            >
                <Ansi>
                    {logText}
                </Ansi>
            </Box>
        </Box>
    );
}