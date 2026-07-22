import GenericModal from "../GenericModal.tsx";
import SettingsHeader from "./SettingsHeader.tsx";
import SettingsCheckbox from "./SettingsCheckbox.tsx";
import {Add, Explore, OpenWith, SwapHoriz, SwapVert, ThreeSixty, Image} from "@mui/icons-material";
import useClientSettings from "../../../hooks/settings/useClientSettings.ts";
import SettingsDropdown from "./SettingsDropdown.tsx";
import {MenuItem} from "@mui/material";

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
                checked={clientSettings.enableFieldCursor}
                onChange={(checked) => setClientSettings({enableFieldCursor: checked})}
            />
            <SettingsCheckbox
                icon={<OpenWith/>}
                label={"Swap Axes"}
                checked={clientSettings.swapAxes}
                onChange={(checked) => setClientSettings({swapAxes: checked})}
            />
            <SettingsCheckbox
                icon={<SwapHoriz/>}
                label={"Mirror X Axis"}
                checked={clientSettings.mirrorXAxis}
                onChange={(checked) => setClientSettings({mirrorXAxis: checked})}
            />
            <SettingsCheckbox
                icon={<SwapVert/>}
                label={"Mirror Y Axis"}
                checked={clientSettings.mirrorYAxis}
                onChange={(checked) => setClientSettings({mirrorYAxis: checked})}
            />
            <SettingsCheckbox
                icon={<ThreeSixty/>}
                label={"Reverse Compass"}
                checked={clientSettings.reverseCompass}
                onChange={(checked) => setClientSettings({reverseCompass: checked})}
            />

            <SettingsDropdown
                icon={<Explore/>}
                label={"Compass Head"}
                value={clientSettings.compassHead}
                onChange={(value) => setClientSettings({compassHead: value})}
            >
                <MenuItem value={"N"}>North</MenuItem>
                <MenuItem value={"E"}>East</MenuItem>
                <MenuItem value={"S"}>South</MenuItem>
                <MenuItem value={"W"}>West</MenuItem>
            </SettingsDropdown>

            <SettingsDropdown
                icon={<Image/>}
                label={"Field Background Image"}
                value={clientSettings.fieldLayoutID}
                onChange={(value) => setClientSettings({fieldLayoutID: value})}
            >
                <MenuItem value={"Override_VEXU.png"}>Override</MenuItem>
                <MenuItem value={"PushBack_VEXU_Match.png"}>Push Back</MenuItem>
                <MenuItem value={"HighStakes_VEXU_Match.png"}>High Stakes</MenuItem>
                <MenuItem value={"blank.png"}>Blank</MenuItem>
            </SettingsDropdown>
        </GenericModal>
    );
}
