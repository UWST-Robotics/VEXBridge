import DefaultSettings from "../../../types/db/DefaultSettings.ts";
import {atomWithStorage} from "jotai/utils";
import {useAtom} from "jotai";

// Atoms
export const settingsAtom = atomWithStorage("settings", DefaultSettings);

// Hooks
export default function useSettings() {
    return useAtom(settingsAtom);
}