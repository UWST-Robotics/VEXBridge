import FlexNumericInput from "../../common/FlexNumericInput.tsx";
import {Box} from "@mui/material";
import useMaxTimeWindow from "../../../hooks/valueOverTime/useMaxTimeWindow.ts";

export default function MaxTimeWindowInput() {
    const [maxTimeWindow, setMaxTimeWindow] = useMaxTimeWindow();

    return (
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
                    label: "Time Window (s)",
                    size: "small"
                }}
            />
        </Box>
    );
}