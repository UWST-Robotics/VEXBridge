import {atom} from "jotai";
import NTValue from "../../../types/nt/NTValue.ts";

// Atoms
export const ntValuesAtom = atom<Record<number, NTValue>>({});