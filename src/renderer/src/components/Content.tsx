import LeftSidebar from "./leftSidebar/LeftSidebar.tsx";
import {Box, Paper} from "@mui/material";
import Navbar from "./navbar/navbar.tsx";
import HardwareStatusPage from "./contentArea/hardwareStatus/HardwareStatusPage.tsx";
import LogOutputPage from "./contentArea/logOutput/LogOutputPage.tsx";
import FieldCanvasPage from "./contentArea/fieldCanvas/FieldCanvasPage.tsx";
import GraphPage from "./contentArea/graphPage/GraphPage.tsx";
import Footer from "./footer/Footer.tsx";

export default function Content() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                alignContent: "stretch",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row",
                    overflow: "hidden",
                }}
            >
                <LeftSidebar/>
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Navbar/>
                    <HardwareStatusPage/>
                    <LogOutputPage/>
                    <FieldCanvasPage/>
                    <GraphPage/>
                </Paper>
            </Box>

            <Footer/>
        </Box>
    );
}