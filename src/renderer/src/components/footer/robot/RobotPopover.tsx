import {Box, Popover, Typography} from "@mui/material";

export interface RobotPopoverProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;

    isEnabled: boolean;
    firmwareVersion: string;
}

export default function RobotPopover(props: RobotPopoverProps) {
    const {
        anchorEl,
        onClose,
        isEnabled,
        firmwareVersion
    } = props;

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorPosition={{top: 0, left: 0}}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
        >
            <Box sx={{padding: 2}}>
                <Typography
                    variant={"subtitle1"}
                    sx={{fontWeight: "bold"}}
                >
                    Robot Stats
                </Typography>

                <Typography variant={"body2"}>
                    {isEnabled ? "Enabled" : "Disabled"}
                </Typography>
                <Typography variant={"body2"}>
                    Firmware Version: {firmwareVersion}
                </Typography>
            </Box>
        </Popover>
    )
}