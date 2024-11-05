import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SettingsEthernet, Star} from "@mui/icons-material";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";

export interface SerialOptionProps {
    portPath: string;
}

export default function SerialIndicatorOption(props: SerialOptionProps) {
    const {portPath} = props;

    const name = useNTValue(portPath + "/name");
    const path = useNTValue(portPath + "/path");
    const isActive = useNTValue(portPath + "/isActive");
    const isVEX = useNTValue(portPath + "/isVEX");
    const manufacturer = useNTValue(portPath + "/manufacturer");
    const selectPort = () => electronAPI?.setSerialPort(path?.toString() ?? "");

    // Hide deleted ports
    if (!path)
        return null;

    return (
        <ListItem
            disablePadding
            secondaryAction={isVEX && <Star/>}
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
                    primary={name}
                    secondary={`${manufacturer ?? "N/A"} · ${path ?? "N/A"}`}
                />
            </ListItemButton>
        </ListItem>
    )
}