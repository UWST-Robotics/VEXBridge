import {atomWithDefault} from "jotai/utils";
import fetchAPIEndpoint from "../../utils/fetchAPIEndpoint.ts";
import SerialState from "../../../types/serial/SerialState.ts";
import {useAtomValue} from "jotai";

const API_ENDPOINT = "/api/serial";

// Atoms
export const serialStateAtom = atomWithDefault(() => fetchAPIEndpoint<SerialState>(API_ENDPOINT));

// Hooks
export default function useSerialState() {
    return useAtomValue(serialStateAtom);
}