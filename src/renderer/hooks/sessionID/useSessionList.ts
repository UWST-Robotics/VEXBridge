import {useAtomValue} from "jotai";
import {atomWithDefault} from "jotai/utils";
import fetchAPIEndpoint from "../../utils/fetchAPIEndpoint.ts";
import SessionInfo from "../../../types/db/SessionInfo.ts";

const API_ENDPOINT = "/api/sessions/list";

export const sessionListAtom = atomWithDefault(() => fetchAPIEndpoint<SessionInfo[]>(API_ENDPOINT));

export default function useSessionList() {
    return useAtomValue(sessionListAtom);
}