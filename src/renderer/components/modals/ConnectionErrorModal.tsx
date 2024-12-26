import useSocketStatus from "../../hooks/socket/useSocketStatus.ts";
import {CircularProgress} from "@mui/material";
import useInitState from "../../hooks/initialization/useInitState.ts";
import FullscreenModal from "./FullscreenModal.tsx";
import InitState from "../../../types/InitState.ts";
import {Warning} from "@mui/icons-material";

export default function ConnectionErrorModal() {
    const socketStatus = useSocketStatus();
    const initState = useInitState();

    const isSocketDisconnected = socketStatus !== "connected";
    const isInitializing = !isSocketDisconnected && initState === InitState.LOADING;
    const isErrored = !isSocketDisconnected && initState === InitState.ERROR;

    return (
        <>
            <FullscreenModal
                isVisible={isSocketDisconnected}
                title={"Connecting..."}
                message={"Trying to connect to the server. If this takes too long, try refreshing the page."}
                icon={<CircularProgress size={40} color={"inherit"} thickness={6} sx={{margin: 1}}/>}
            />
            <FullscreenModal
                isVisible={isInitializing}
                title={"Downloading..."}
                message={"Fetching the current session values from the server."}
                icon={<CircularProgress size={40} color={"inherit"} thickness={6} sx={{margin: 1}}/>}
            />
            <FullscreenModal
                isVisible={isErrored}
                title={"Error"}
                message={"An error occurred while retrieving data from the server. Please try refreshing the page."}
                icon={<Warning color={"inherit"} sx={{fontSize: 50, margin: 1}}/>}
            />
        </>
    )
}