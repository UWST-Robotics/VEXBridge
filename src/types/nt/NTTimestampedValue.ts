import NTValue from "./NTValue.ts";

export default interface NTTimestampedValue {
    value: NTValue;
    timestamp: number;
}