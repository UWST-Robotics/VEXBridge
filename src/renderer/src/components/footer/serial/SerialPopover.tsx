import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography} from "@mui/material";
import SerialPopoverOption from "./SerialPopoverOption.tsx";
import {AutoAwesome} from "@mui/icons-material";
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
                <ListItem disablePadding>
                    <ListItemButton dense>
                        <ListItemIcon sx={{minWidth: 40}}>
                            <AutoAwesome color={"inherit"}/>
                        </ListItemIcon>
                        <ListItemText primary={"Automatic Serial"}/>
                    </ListItemButton>
                </ListItem>

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
                        sx={{margin: 1, color: "text.disabled"}}
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
                    sx={{margin: 1, color: "text.disabled", textAlign: "center"}}
                >
                    Not yet implemented
                </Typography>
            </List>
        </Popover>
    );
}