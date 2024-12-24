import {atom, useAtomValue} from "jotai";

export const sessionIDAtom = atom<number | undefined>(undefined);

export default function useSessionID() {
    return useAtomValue(sessionIDAtom);
}