import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SettingsEthernet} from "@mui/icons-material";
import VEXSerialTypeIcon from "./VEXSerialTypeIcon.tsx";
import SerialPortInfo from "../../../../../types/SerialPortInfo.ts";

export interface SerialOptionProps {
    port: SerialPortInfo;
}

export default function SerialPopoverOption(props: SerialOptionProps) {
    const {friendlyName, path, vexType} = props.port;
    const isActive = false;

    const selectPort = () => electronAPI?.setSerialPort(path?.toString() ?? "");

    // Hide deleted ports
    if (!path)
        return null;

    return (
        <ListItem
            disablePadding
            secondaryAction={<VEXSerialTypeIcon type={vexType}/>}
        >
            <ListItemButton
                dense
                selected={Boolean(isActive)}
                onClick={selectPort}
            >
                <ListItemIcon sx={{minWidth: 40}}>
                    <SettingsEthernet
                        color={isActive ? "inherit" : "disabled"}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={friendlyName || path}
                />
            </ListItemButton>
        </ListItem>
    );
}