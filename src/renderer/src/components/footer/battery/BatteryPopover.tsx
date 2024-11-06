import {Box, Popover, Typography} from "@mui/material";

export interface BatteryPopoverProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;

    batteryPercent: number;
    voltage: number;
    current: number;
    temperature: number;
}

export default function BatteryPopover(props: BatteryPopoverProps) {
    const {
        anchorEl,
        onClose,
        batteryPercent,
        voltage,
        current,
        temperature
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
                    Battery Stats
                </Typography>

                {!isNaN(voltage) && (
                    <Typography variant={"body2"}>
                        {(voltage / 1000).toFixed(1)} V (~{batteryPercent.toFixed(1)}%)
                    </Typography>
                )}
                {!isNaN(current) && (
                    <Typography variant={"body2"}>
                        {(current / 1000).toFixed(1)} A
                    </Typography>
                )}
                {!isNaN(temperature) && (
                    <Typography variant={"body2"}>
                        {temperature} °C
                    </Typography>
                )}

                {isNaN(voltage) && isNaN(current) && isNaN(temperature) && (
                    <Typography
                        variant={"body2"}
                        sx={{color: "#d64a4a"}}
                    >
                        No Data
                    </Typography>
                )}
            </Box>
        </Popover>
    );
}