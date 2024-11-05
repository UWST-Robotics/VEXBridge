import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import hashString from "../../utils/hashString.ts";

// Atoms
export const colorFromStringAtomFamily = atomFamily((str: string) => atom(() => {

    // Hash the string to get a random color
    let hash = hashString(str);

    // Add some randomness to the hash
    hash *= Math.random() * 100000;

    // Convert the hash to a color
    const h = hash % 360;
    const s = 100;
    const l = 50;

    return `hsl(${h}, ${s}%, ${l}%)`;
}));

// Hooks
export default function colorFromString(str: string) {
    return useAtomValue(colorFromStringAtomFamily(str));
}