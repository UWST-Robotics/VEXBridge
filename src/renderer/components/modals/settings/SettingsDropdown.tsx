import {FormControl, ListItem, ListItemButton, ListItemIcon, ListItemText, Select} from "@mui/material";
import React from "react";

export interface SettingsDropdownProps<T> {
    icon?: React.ReactNode;
    label: string;
    value: T;
    onChange: (value: T) => void;
    children: React.ReactNode;
}

export default function SettingsDropdown<T>(props: SettingsDropdownProps<T>) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <FormControl fullWidth>
                    <Select
                        open={isOpen}
                        onOpen={() => setIsOpen(true)}
                        onClose={() => setIsOpen(false)}
                        size={"small"}
                        variant={"standard"}
                        value={props.value}
                        onChange={(event) => props.onChange(event.target.value as T)}
                    >
                        {props.children}
                    </Select>
                </FormControl>
            }
        >
            <ListItemButton
                onClick={() => setIsOpen(true)}
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
    );
}