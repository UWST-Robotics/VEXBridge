import {CircularProgress, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SettingsEthernet} from "@mui/icons-material";
import VEXSerialTypeIcon from "./VEXSerialTypeIcon.tsx";
import VEXSerialPortInfo from "../../../../types/serial/VEXSerialPortInfo.ts";
import useSerialState from "../../../hooks/serialPorts/useSerialState.ts";
import useSetSerialPort from "../../../hooks/serialPorts/actions/useSetSerialPort.ts";

export interface SerialOptionProps {
    port: VEXSerialPortInfo;
}

export default function SerialPopoverOption(props: SerialOptionProps) {
    const setSerialPort = useSetSerialPort();
    const serialState = useSerialState();

    const {friendlyName, path, vexType} = props.port;

    const isConnected = serialState?.path === path && serialState.isOpen;
    const isConnecting = serialState?.targetPath === path && !isConnected;

    const selectPort = () => setSerialPort(path?.toString() ?? "");

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
                selected={isConnected}
                onClick={selectPort}
            >
                <ListItemIcon sx={{minWidth: 40}}>
                    {isConnecting ? (
                        <CircularProgress
                            size={20}
                            color={"inherit"}
                            thickness={5}
                        />
                    ) : (
                        <SettingsEthernet
                            color={isConnected ? "inherit" : "disabled"}
                        />
                    )}
                </ListItemIcon>
                <ListItemText
                    primary={friendlyName || path}
                />
            </ListItemButton>
        </ListItem>
    );
}