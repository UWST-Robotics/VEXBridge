import useCurrentTab from "../../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import GraphValuesOverTime from "./GraphValuesOverTime.tsx";

export default function GraphPage() {
    const [currentTab] = useCurrentTab();

    if (currentTab !== "graph")
        return null;
    return (
        <Box
            sx={{
                display: "flex",
                padding: 2,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflowY: "auto",
            }}
        >
            <GraphValuesOverTime/>
        </Box>
    );
}