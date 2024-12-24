import {List, Popover, Skeleton, Typography} from "@mui/material";
import SerialPopoverOption from "./SerialPopoverOption.tsx";
import useSerialPorts from "../../../hooks/serialPorts/useSerialPorts.ts";
import SerialAutoSelectPopoverOption from "./SerialAutoSelectPopoverOption.tsx";

export interface SerialPopoverProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;
}

export default function SerialPopover(props: SerialPopoverProps) {
    const [serialPorts] = useSerialPorts();
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
                {serialPorts && <SerialAutoSelectPopoverOption/>}
                {serialPorts?.map((port) => (
                    <SerialPopoverOption
                        key={port.path}
                        port={port}
                    />
                ))}

                {serialPorts === undefined && (
                    <Skeleton
                        width={300}
                        height={24}
                        variant={"rectangular"}
                        animation={"wave"}
                        sx={{margin: 1}}
                    />
                )}

                {serialPorts?.length === 0 && (
                    <Typography
                        sx={{
                            margin: 1,
                            paddingLeft: 2,
                            paddingRight: 2,
                            color: "text.disabled"
                        }}
                    >
                        No serial ports found
                    </Typography>
                )}
            </List>
        </Popover>
    );
}