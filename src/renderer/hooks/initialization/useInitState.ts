import {atom, useAtomValue} from "jotai";
import InitState from "../../../types/InitState.ts";

// Atoms
export const initStateAtom = atom<InitState>(InitState.LOADING);

// Hooks
export default function useInitState() {
    return useAtomValue(initStateAtom);
}