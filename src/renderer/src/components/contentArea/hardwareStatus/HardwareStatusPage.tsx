import {HARDWARE_INFO_GROUP} from "../../../types/GroupNames.ts";
import useCurrentTab from "../../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import HardwareStatusCard from "./HardwareStatusCard.tsx";
import useNTGroupInfo from "../../../hooks/networkTable/useNTGroupInfo.ts";
import NonIdealState from "../../common/NonIdealState.tsx";
import {WarningAmber} from "@mui/icons-material";

export default function HardwareStatusPage() {
    const [currentTab] = useCurrentTab();
    const hardwareGroup = useNTGroupInfo(HARDWARE_INFO_GROUP);

    if (currentTab !== "hardware")
        return null;
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    padding: 2,
                    overflowY: "auto"
                }}
            >
                {hardwareGroup?.children.map((child) => (
                    <HardwareStatusCard
                        key={child.path}
                        hardwareGroup={child}
                    />
                ))}
            </Box>


            {(hardwareGroup?.children.length ?? 0) === 0 && (
                <NonIdealState
                    icon={<WarningAmber sx={{fontSize: 60}}/>}
                    title={"No Hardware Information"}
                    description={"No hardware information has been received from the robot"}
                />
            )}
        </>
    );
}