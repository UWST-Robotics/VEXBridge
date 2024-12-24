import FlexNumericInput from "../../common/FlexNumericInput.tsx";
import {Box} from "@mui/material";

export default function MaxTimeWindowInput() {
    //const [maxTimeWindow, setMaxTimeWindow] = useMaxTimeWindow();

    // TODO: Implement useMaxTimeWindow hook
    const maxTimeWindow = 10000;
    const setMaxTimeWindow = (_: number) => {
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
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