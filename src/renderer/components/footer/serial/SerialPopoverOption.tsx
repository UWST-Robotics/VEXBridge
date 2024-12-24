import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SettingsEthernet} from "@mui/icons-material";
import VEXSerialTypeIcon from "./VEXSerialTypeIcon.tsx";
import VEXSerialPortInfo from "../../../../types/serial/VEXSerialPortInfo.ts";
import useSerialState from "../../../hooks/serialPorts/useSerialState.ts";

export interface SerialOptionProps {
    port: VEXSerialPortInfo;
}

export default function SerialPopoverOption(props: SerialOptionProps) {
    const serialState = useSerialState();

    const {friendlyName, path, vexType} = props.port;
    const isActive = serialState.port === path && serialState.isOpen;

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