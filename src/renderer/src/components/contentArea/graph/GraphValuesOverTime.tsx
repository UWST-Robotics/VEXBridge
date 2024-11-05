import SelectedValueChart from "./SelectedValueChart.tsx";
import FlexNumericInput from "../../common/FlexNumericInput.tsx";
import {Box} from "@mui/material";
import useMaxTimeWindow from "../../../hooks/valueOverTime/useMaxTimeWindow.ts";

export default function GraphValuesOverTime() {
    const [maxTimeWindow, setMaxTimeWindow] = useMaxTimeWindow();

    return (
        <>
            <SelectedValueChart/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <FlexNumericInput
                    value={maxTimeWindow / 1000}
                    onChange={(value) => setMaxTimeWindow(value * 1000)}
                    min={1}
                    inputProps={{
                        label: "Max Time Window (s)"
                    }}
                />
            </Box>
        </>
    )
}