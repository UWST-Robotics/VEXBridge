import useCurrentTab from "../../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import SelectedValuesTable from "./selectedValuesTable/SelectedValuesTable.tsx";
import MaxTimeWindowInput from "./MaxTimeWindowInput.tsx";
import SelectedValuesChart from "./chart/SelectedValuesChart.tsx";

export default function GraphPage() {
    const [currentTab] = useCurrentTab();

    if (currentTab !== "graphPage")
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
            <SelectedValuesChart/>
            <MaxTimeWindowInput/>
            <SelectedValuesTable/>
        </Box>
    );
}