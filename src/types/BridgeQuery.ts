import BaseSerialPortInfo from "./BaseSerialPortInfo.ts";

export default interface BridgeQuery {
    name: string;
    ports: BaseSerialPortInfo[];
}