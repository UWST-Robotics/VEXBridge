import VEXSerialType from "./VEXSerialType.ts";
import SerialPortInfo from "./SerialPortInfo.ts";

export default interface VEXSerialPortInfo extends SerialPortInfo {
    vexType: VEXSerialType;
}