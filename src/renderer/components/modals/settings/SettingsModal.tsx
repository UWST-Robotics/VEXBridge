import GenericModal from "../GenericModal.tsx";
import SettingsHeader from "./SettingsHeader.tsx";
import SettingsCheckbox from "./SettingsCheckbox.tsx";
import {Add} from "@mui/icons-material";
import useClientSettings from "../../../hooks/settings/useClientSettings.ts";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
    const [clientSettings, setClientSettings] = useClientSettings();

    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
            title={"Settings"}
        >
            <SettingsHeader>Field Map</SettingsHeader>

            <SettingsCheckbox
                icon={<Add/>}
                label={"Enable Crosshair"}
                description={"When enabled, a crosshair will be displayed at your cursor position when hovering over the field map."}
                checked={clientSettings.enableFieldCursor}
                onChange={(checked) => setClientSettings({enableFieldCursor: checked})}
            />
        </GenericModal>
    );
}
