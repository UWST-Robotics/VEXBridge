import NTValue from "./NTValue.ts";

/**
 * Records the history of values w/ timestamps.
 * `values.length == timestamps.length`
 *  Purposely structured such that `JSON.stringify` will avoid repetitive overhead.
 */
export default interface NTValueHistory {
    key: number;
    path?: string;
    latestValue: NTValue;
    values: NTValue[];
    timestamps: number[];
}