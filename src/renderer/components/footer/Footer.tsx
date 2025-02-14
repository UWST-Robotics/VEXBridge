import {Paper} from "@mui/material";
import SerialButton from "./serial/SerialButton.tsx";

export default function Footer() {
    return (
        <Paper
            sx={{
                borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                paddingLeft: 2,
                paddingRight: 2,
            }}
        >

            <SerialButton/>
            {/*<SettingsButton/>*/}
        </Paper>
    );
}