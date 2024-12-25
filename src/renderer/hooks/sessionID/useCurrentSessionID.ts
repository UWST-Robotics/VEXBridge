import {atom, useAtom} from "jotai";

export const currentSessionIDAtom = atom<number | undefined>(undefined);

export default function useCurrentSessionID() {
    return useAtom(currentSessionIDAtom);
}