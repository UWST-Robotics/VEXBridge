import {atom, useAtom} from "jotai";
import ClientSettings, {DefaultClientSettings} from "../../../types/db/ClientSettings.ts";
import {partialClientSettingsAtom} from "./usePartialClientSettings.ts";

// Atoms
export const clientSettingsAtom = atom(get => {
    // Fetch partial settings
    const partialClientSettings = get(partialClientSettingsAtom);

    // Merge partial settings with default settings
    return {
        ...DefaultClientSettings,
        ...partialClientSettings
    };
}, (get, set, update: Partial<ClientSettings>) => {
    // Fetch partial settings
    const partialClientSettings = get(partialClientSettingsAtom);

    // Merge partial settings with updated settings
    set(partialClientSettingsAtom, {...partialClientSettings, ...update});
});

// Hooks
export default function useClientSettings() {
    return useAtom(clientSettingsAtom);
}