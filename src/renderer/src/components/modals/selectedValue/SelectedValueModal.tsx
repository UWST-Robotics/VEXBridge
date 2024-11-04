import useSelectedPath from "../../../hooks/selectedPath/useSelectedPath.ts";
import {Box, Modal} from "@mui/material";
import useSelectPath from "../../../hooks/selectedPath/actions/useSelectPath.ts";
import SelectedValueChart from "./SelectedValueChart.tsx";
import useMaxTimeWindow from "../../../hooks/valueOverTime/useMaxTimeWindow.ts";
import FlexNumericInput from "../../common/FlexNumericInput.tsx";

export default function SelectedValueModal() {
    const selectedPath = useSelectedPath();
    const selectPath = useSelectPath();
    const [maxTimeWindow, setMaxTimeWindow] = useMaxTimeWindow();

    return (
        <Modal
            open={selectedPath !== undefined}
            onClose={() => selectPath(undefined)}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "90vw",
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    pt: 2,
                    px: 4,
                    pb: 3
                }}
            >
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
            </Box>
        </Modal>
    );
}