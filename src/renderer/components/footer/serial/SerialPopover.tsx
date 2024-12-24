import {List, Popover, Typography} from "@mui/material";
import SerialPopoverOption from "./SerialPopoverOption.tsx";
import useSerialPorts from "../../../hooks/serialPorts/useSerialPorts.ts";

export interface SerialPopoverProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;
}

export default function SerialPopover(props: SerialPopoverProps) {
    const serialPorts = useSerialPorts();
    const {anchorEl, onClose} = props;

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
            <List>
                <Typography
                    variant={"subtitle1"}
                    sx={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: "text.secondary",
                        paddingLeft: 2,
                        marginTop: 1
                    }}
                >
                    Local Serial Ports
                </Typography>
                {serialPorts.map((port) => (
                    <SerialPopoverOption
                        key={port.path}
                        port={port}
                    />
                ))}
                {serialPorts.length == 0 && (
                    <Typography
                        sx={{
                            margin: 1,
                            paddingLeft: 2,
                            color: "text.disabled"
                        }}
                    >
                        No serial ports found
                    </Typography>
                )}

                <Typography
                    variant={"subtitle1"}
                    sx={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: "text.secondary",
                        paddingLeft: 2,
                        marginTop: 1
                    }}
                >
                    Remote Serial Ports
                </Typography>
                <Typography
                    sx={{
                        margin: 1,
                        paddingLeft: 2,
                        color: "text.disabled",
                        textAlign: "center"
                    }}
                >
                    No remote serial ports found
                </Typography>
            </List>
        </Popover>
    );
}