import NTGroupInfo from "../../../types/nt/NTGroupInfo.ts";
import {Alert, Box, Card, CardContent, Typography} from "@mui/material";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";
import NTGroupTable from "../../common/nt/NTGroupTable.tsx";

export interface HardwareStatusCardProps {
    hardwareGroup: NTGroupInfo;
}

export default function HardwareStatusCard(props: HardwareStatusCardProps) {
    const {hardwareGroup} = props;
    const name = useNTValue(hardwareGroup.path + "/name");
    const type = useNTValue(hardwareGroup.path + "/type");
    const faults = useNTValue(hardwareGroup.path + "/faults");

    return (
        <Box
            sx={{
                minWidth: 300,
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Card sx={{flex: 1}}>
                <CardContent>
                    <Typography
                        variant={"body1"}
                        component={"div"}
                        sx={{fontWeight: "bold"}}
                    >
                        {name || "Unnamed Hardware"}
                    </Typography>
                    <Typography
                        gutterBottom
                        sx={{color: "text.secondary", fontSize: 14}}
                    >
                        {hardwareGroup.name} · {type || "Unknown"}
                    </Typography>

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