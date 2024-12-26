export default interface SerialState {
    isOpen: boolean;
    path: string;
    baudRate: number;

    targetPath: string;
    autoSelect: boolean;
}