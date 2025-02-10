import {atom} from "jotai";
import ServerSettings from "../../../types/db/ServerSettings.ts";
import {settingsAtom} from "./useSettings.ts";

export const updateServerSettingsAtom = atom(null, (get, set, serverSettings: ServerSettings) => {
    const settings = get(settingsAtom);
    set(settingsAtom, {
        ...settings,
        server: serverSettings
    });
});