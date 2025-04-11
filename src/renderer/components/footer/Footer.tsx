import {Box, Paper} from "@mui/material";
import SerialButton from "./serial/SerialButton.tsx";
import SettingsButton from "./settings/SettingsButton.tsx";

export default function Footer() {
    return (
        <Paper
            sx={{
                borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                paddingLeft: 2,
                paddingRight: 2,
                display: "flex",
            }}
        >

            <SerialButton/>
            <Box sx={{flexGrow: 1}}/>
            <SettingsButton/>
        </Paper>
    );
}