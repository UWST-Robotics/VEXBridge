import {HARDWARE_INFO_GROUP} from "../../../utils/GroupNames.ts";
import useCurrentTab from "../../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import HardwareStatusCard from "./HardwareStatusCard.tsx";
import useNTGroupInfo from "../../../hooks/ntGroupInfo/useNTGroupInfo.ts";
import NonIdealState from "../../common/NonIdealState.tsx";
import {WarningAmber} from "@mui/icons-material";

export default function HardwareStatusPage() {
    const [currentTab] = useCurrentTab();
    const hardwareGroup = useNTGroupInfo(HARDWARE_INFO_GROUP);

    const hasHardware = (hardwareGroup?.children.length ?? 0) > 0;

    if (currentTab !== "hardware")
        return null;
    return (
        <>
            {hasHardware ? (
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
            ) : (
                <NonIdealState
                    icon={<WarningAmber sx={{fontSize: 60}}/>}
                    title={"No Hardware Information"}
                    description={"No hardware information has been received from the robot"}
                />
            )}
        </>
    );
}