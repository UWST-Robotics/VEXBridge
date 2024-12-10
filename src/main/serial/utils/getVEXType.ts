import BaseSerialPortInfo from "../../../types/BaseSerialPortInfo.ts";
import VEXSerialType from "../../../types/VEXSerialType.ts";

const VENDOR_ID = "2888";
const PRODUCT_ID = "0501";

export default function getVEXType(port: BaseSerialPortInfo) {
    // Check if the port is a VEX port
    const isVexPort = port.vendorId === VENDOR_ID && port.productId === PRODUCT_ID;
    if (!isVexPort)
        return VEXSerialType.NONE;

    // VEX Brain
    if (port.pnpId?.endsWith("0"))
        return VEXSerialType.SYSTEM;

    // VEX Controller
    else if (port.pnpId?.endsWith("1"))
        return VEXSerialType.CONTROLLER;

    // VEX Serial Output (User)
    else if (port.pnpId?.endsWith("2"))
        return VEXSerialType.USER;

    // Unknown type
    else
        return VEXSerialType.NONE;
}