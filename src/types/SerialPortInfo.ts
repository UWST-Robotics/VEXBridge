import VEXSerialType from "./VEXSerialType.ts";
import BaseSerialPortInfo from "./BaseSerialPortInfo.ts";

export default interface SerialPortInfo extends BaseSerialPortInfo {
    isRemote: boolean;
    vexType: VEXSerialType;
}