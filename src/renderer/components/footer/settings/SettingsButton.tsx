import {Button} from "@mui/material";
import {Settings} from "@mui/icons-material";
import React from "react";
import SettingsModal from "../../modals/settings/SettingsModal.tsx";

export default function SettingsButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <Button
                size={"small"}
                variant={"text"}
                color={"inherit"}
                sx={{paddingRight: 1, paddingLeft: 1, color: "lightgray"}}
                onClick={() => setIsOpen(true)}
            >
                <Settings
                    fontSize={"small"}
                    color={"inherit"}
                />
            </Button>

            <SettingsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}