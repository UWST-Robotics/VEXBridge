import {atomWithDefault} from "jotai/utils";
import fetchAPIEndpoint from "../../utils/fetchAPIEndpoint.ts";
import SessionInfo from "../../../types/db/SessionInfo.ts";
import {useAtomValue} from "jotai";

const API_ENDPOINT = "/api/sessions/active";

// Atoms
export const latestSessionInfoAtom = atomWithDefault(() => fetchAPIEndpoint<SessionInfo>(API_ENDPOINT));

// Hooks
export default function useActiveSessionInfo() {
    return useAtomValue(latestSessionInfoAtom);
}