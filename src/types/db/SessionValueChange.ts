export default interface SessionValueChange {
    valueChangeID: number;
    sessionID: number;
    timestamp: Date;
    key: number;
    newValue: string;
}