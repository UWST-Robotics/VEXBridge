import LeftSidebar from "./leftSidebar/LeftSidebar.tsx";
import {Box, Paper} from "@mui/material";
import Navbar from "./navbar/navbar.tsx";
import HardwareStatusPage from "./contentArea/hardwareStatus/HardwareStatusPage.tsx";
import LogOutputPage from "./contentArea/logOutput/LogOutputPage.tsx";
import FieldCanvasPage from "./contentArea/fieldCanvas/FieldCanvasPage.tsx";
import GraphPage from "./contentArea/graphPage/GraphPage.tsx";
import Footer from "./footer/Footer.tsx";
import ConnectionErrorModal from "./modals/ConnectionErrorModal.tsx";

export default function Content() {
    return (
        <>
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
                        display: "flex",
                        flexDirection: "row",
                        minHeight: "0",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <LeftSidebar/>
                    <Paper
                        elevation={0}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            minWidth: "0",
                            flexGrow: 1
                        }}
                    >
                        <Navbar/>
                        <Box
                            sx={{
                                overflowY: "auto",
                                height: "100%",
                            }}
                        >
                            <HardwareStatusPage/>
                            <LogOutputPage/>
                            <FieldCanvasPage/>
                            <GraphPage/>
                        </Box>
                    </Paper>
                </Box>

                <Footer/>
            </Box>

            <ConnectionErrorModal/>
        </>
    );
}