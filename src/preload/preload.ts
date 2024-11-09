import {contextBridge, ipcRenderer} from "electron";
import NTRecord from "../types/NTRecord";
import SerialPortInfo from "../types/SerialPortInfo.ts";
import SerialState from "../types/SerialState.ts";
import RobotState from "../types/RobotState.ts";

const electronAPI = {

    // Renderer >> Electron Functions
    setSerialPort: (path: string) => ipcRenderer.send("setSerialPort", path),
    getAllRecords: () => ipcRenderer.send("getAllRecords"),
    autoConnectSerial: () => ipcRenderer.send("autoConnectSerial"),

    // Electron >> Renderer Listeners
    onSetAllRecords: (callback: (records: NTRecord[]) => void) => {
        ipcRenderer.on("onSetAllRecords", (_, records: NTRecord[]) => callback(records));
    },
    onUpdateRecord: (callback: (record: NTRecord) => void) => {
        ipcRenderer.on("onUpdateRecord", (_, record: NTRecord) => callback(record));
    },
    onLog: (callback: (message: string) => void) => {
        ipcRenderer.on("onLog", (_, message: string) => callback(message));
    },
    onSerialPorts: (callback: (ports: SerialPortInfo[]) => void) => {
        ipcRenderer.on("onSerialPorts", (_, ports: SerialPortInfo[]) => callback(ports));
    },
    onSerialState: (callback: (state: SerialState) => void) => {
        ipcRenderer.on("onSerialState", (_, state: SerialState) => callback(state));
    },
    onRobotState: (callback: (state: RobotState) => void) => {
        ipcRenderer.on("onRobotState", (_, state: RobotState) => callback(state));
    },

    // Remove Listeners (For React Unmounting)
    removeAllListeners: () => {
        ipcRenderer.removeAllListeners("onSetAllRecords");
        ipcRenderer.removeAllListeners("onUpdateRecord");
        ipcRenderer.removeAllListeners("onLog");
        ipcRenderer.removeAllListeners("onSerialPorts");
        ipcRenderer.removeAllListeners("onSerialState");
        ipcRenderer.removeAllListeners("onRobotState");
    }
};
contextBridge.exposeInMainWorld("electronAPI", electronAPI);

type ElectronAPI = typeof electronAPI;
export default ElectronAPI;