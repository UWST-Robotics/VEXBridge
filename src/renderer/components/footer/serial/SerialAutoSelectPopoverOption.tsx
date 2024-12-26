import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import useSerialState from "../../../hooks/serialPorts/useSerialState.ts";
import useSetSerialPort from "../../../hooks/api/actions/useSetSerialPort.ts";
import {AutoAwesome} from "@mui/icons-material";

export default function SerialAutoSelectPopoverOption() {
    const setSerialPort = useSetSerialPort();
    const serialState = useSerialState();

    const isActive = serialState?.autoSelect;

    const selectPort = () => setSerialPort("", true).catch(console.error);

    return (
        <ListItem disablePadding>
            <ListItemButton
                dense
                selected={Boolean(isActive)}
                onClick={selectPort}
            >
                <ListItemIcon sx={{minWidth: 40}}>
                    <AutoAwesome
                        color={isActive ? "inherit" : "disabled"}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={"Auto-select port"}
                />
            </ListItemButton>
        </ListItem>
    );
}