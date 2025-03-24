import {Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip} from "@mui/material";

export interface SettingsCheckboxProps {
    icon?: React.ReactNode;
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function SettingsCheckbox(props: SettingsCheckboxProps) {
    return (
        <Tooltip title={props.description}>
            <ListItem
                dense
                disablePadding
                secondaryAction={
                    <Checkbox
                        edge={"end"}
                        checked={props.checked}
                        onChange={(event) => props.onChange(event.target.checked)}
                    />
                }
            >
                <ListItemButton
                    onClick={() => props.onChange(!props.checked)}
                >
                    {props.icon && (
                        <ListItemIcon>
                            {props.icon}
                        </ListItemIcon>
                    )}
                    
                    <ListItemText
                        primary={props.label}
                    />
                </ListItemButton>
            </ListItem>
        </Tooltip>
    )
}
