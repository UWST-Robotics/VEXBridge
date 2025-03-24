import {atomWithStorage} from "jotai/utils";
import ClientSettings from "../../../types/db/ClientSettings.ts";

// Atoms
export const partialClientSettingsAtom = atomWithStorage<Partial<ClientSettings>>("settings", {});