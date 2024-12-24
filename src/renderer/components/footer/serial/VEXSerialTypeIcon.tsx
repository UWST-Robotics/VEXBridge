import VEXSerialType from "../../../../types/serial/VEXSerialType.ts";
import {Computer, SmartToy, SportsEsports} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import NTValue from "../../../../types/nt/NTValue.ts";

export interface VEXTypeIconProps {
    type: NTValue;
}

export default function VEXSerialTypeIcon(props: VEXTypeIconProps) {

    if (props.type === VEXSerialType.SYSTEM)
        return <Tooltip title={"VEX V5 management interface"}><Computer/></Tooltip>;
    if (props.type === VEXSerialType.USER)
        return <Tooltip title={"VEX V5 robot"}><SmartToy/></Tooltip>;
    if (props.type === VEXSerialType.CONTROLLER)
        return <Tooltip title={"VEX V5 controller"}><SportsEsports/></Tooltip>;

    return null;
}