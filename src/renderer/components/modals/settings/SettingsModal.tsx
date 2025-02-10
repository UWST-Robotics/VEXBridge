import GenericModal from "../GenericModal.tsx";
import SettingsHeader from "./SettingsHeader.tsx";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
            title={"Settings"}
        >
            <SettingsHeader>Serial</SettingsHeader>
        </GenericModal>
    )
}
