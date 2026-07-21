import {atom} from "jotai";
import NTTimestampedValue from "../../../types/nt/NTTimestampedValue.ts";

// Atoms
export const ntValueHistoriesAtom = atom<Record<number, NTTimestampedValue[]>>({});