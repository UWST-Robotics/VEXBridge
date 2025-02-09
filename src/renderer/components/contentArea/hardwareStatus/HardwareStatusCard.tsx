import NTGroupInfo from "../../../../types/nt/NTGroupInfo.ts";
import {Alert, Box, Card, CardContent, Typography} from "@mui/material";
import NTGroupTable from "../../common/nt/NTGroupTable.tsx";
import useNTValueFromPath from "../../../hooks/networkTable/useNTValueFromPath.ts";
import HardwareIcon from "./HardwareIcon.tsx";

export interface HardwareStatusCardProps {
    hardwareGroup: NTGroupInfo;
}

export default function HardwareStatusCard(props: HardwareStatusCardProps) {
    const {hardwareGroup} = props;
    const name = useNTValueFromPath(hardwareGroup.path + "/name");
    const type = useNTValueFromPath(hardwareGroup.path + "/type");
    const faults = useNTValueFromPath(hardwareGroup.path + "/faults");

    return (
        <Box
            sx={{
                minWidth: 300,
                maxWidth: 300,
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Card sx={{flex: 1}}>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            marginBottom: 1
                        }}
                    >
                        <HardwareIcon
                            type={type?.toString()}
                        />

                        <Box sx={{marginLeft: 2}}>
                            <Typography
                                variant={"body1"}
                                component={"div"}
                                sx={{fontWeight: "bold"}}
                            >
                                {name || hardwareGroup.name}
                            </Typography>
                            <Typography
                                sx={{color: "text.secondary", fontSize: 14}}
                            >
                                {type || "Unknown Hardware"}
                            </Typography>
                        </Box>
                    </Box>
                    <NTGroupTable
                        groupInfo={hardwareGroup}
                        blacklist={["name", "type", "faults"]}
                    />

                </CardContent>
            </Card>

            {faults && (
                <Alert
                    severity={"warning"}
                    sx={{
                        borderRadius: 0,
                        borderLeft: "3px solid #ffa726",
                    }}
                >
                    {faults}
                </Alert>
            )}
        </Box>
    );
}