import useCurrentTab from "../../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import { useState } from "react";
import NonIdealState from "../../common/NonIdealState.tsx";
import {WarningAmber} from "@mui/icons-material";
import {CircularProgress} from "@mui/material";
import VisionStream from "./VisionStream.tsx";

const STREAM_URL = "http://localhost:8080/devilcv"

export default function VisionPage() {
    const [currentTab] = useCurrentTab();
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    if (currentTab !== "vision") return null;

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: 1,
                    padding: 2,
                }}
            >
                {imageLoading  ? (
                    <NonIdealState
                        icon={<CircularProgress size={40} color={"inherit"} thickness={6} sx={{margin: 1}}/>}
                        title={"Connecting to DevilCV"}
                        description={"Loading video stream"}
                    />
                ) : 
                imageError ? (
                    <NonIdealState
                        icon={<WarningAmber sx={{fontSize: 60}}/>}
                        title={"Could not connect to DevilCV"}
                        description={"Failed to load stream"}
                    />
                ) : (
                    <VisionStream setImageError={setImageError} setImageLoading={setImageLoading} streamUrl={STREAM_URL}/>
                )}
            </Box>
        </>
    );
}


