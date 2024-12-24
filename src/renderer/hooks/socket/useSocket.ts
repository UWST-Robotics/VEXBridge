import {io} from "socket.io-client";
import {atom, useAtomValue} from "jotai";

export const socketAtom = atom(
    io(undefined, {
        autoConnect: false,
        reconnectionAttempts: 10,
    })
);

export default function useSocket() {
    return useAtomValue(socketAtom);
}