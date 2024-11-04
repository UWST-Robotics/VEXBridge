import {contextBridge, ipcRenderer} from 'electron';
import NTRecord from "../types/NTRecord";

const electronAPI = {

    // Renderer >> Electron Functions
    setSerialPort: (path: string) => ipcRenderer.send('setSerialPort', path),
    getAllRecords: () => ipcRenderer.send('getAllRecords'),

    // Electron >> Renderer Listeners
    onSetAllRecords: (callback: (records: NTRecord[]) => void) => {
        ipcRenderer.on('onSetAllRecords', (_, records: NTRecord[]) => callback(records));
    },
    onUpdateRecord: (callback: (record: NTRecord) => void) => {
        ipcRenderer.on('onUpdateRecord', (_, record: NTRecord) => callback(record));
    },
    onLog: (callback: (message: string) => void) => {
        ipcRenderer.on('onLog', (_, message: string) => callback(message));
    },

    // Remove Listeners (For React Unmounting)
    removeAllListeners: () => {
        ipcRenderer.removeAllListeners('onSetAllRecords');
        ipcRenderer.removeAllListeners('onUpdateRecord');
        ipcRenderer.removeAllListeners('onLog');
    }
};
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

type ElectronAPI = typeof electronAPI;
export default ElectronAPI;