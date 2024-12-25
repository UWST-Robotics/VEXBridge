import {socketStatusAtom} from "./useSocketStatus.ts";
import primaryStore from "../primaryStore.ts";
import useSocket from "./useSocket.ts";
import React from "react";
import NTValue from "../../../types/nt/NTValue.ts";
import {serialStateAtom} from "../serialPorts/useSerialState.ts";
import {resetNTAtom} from "../networkTable/actions/useResetNT.ts";
import {currentSessionIDAtom} from "../sessionID/useCurrentSessionID.ts";
import {setNTKeyFromPathAtom} from "../networkTable/actions/useSetNTKeyFromPath.ts";
import {ntValueAtomFamily} from "../networkTable/useNTValue.ts";
import {appendToLogAtom} from "../log/useAppendToLog.ts";
import {serialPortsAtom} from "../serialPorts/useSerialPorts.ts";

export default function useConnectToSocket() {
    const socket = useSocket();

    React.useEffect(() => {

        // Socket Events
        socket.on("connect", () => {
            console.log("Connected to socket");
            primaryStore.set(socketStatusAtom, "connected");
        });
        socket.on("connect_error", (error: Error) => {
            console.error("Failed to connect to socket", error);
            primaryStore.set(socketStatusAtom, "disconnected");
        });
        socket.on("disconnect", () => {
            console.log("Disconnected from lib");
            primaryStore.set(socketStatusAtom, "disconnected");
        });

        // Serial Events
        socket.on("serial_state", (state) => {
            primaryStore.set(serialStateAtom, state);
        });
        socket.on("serial_list", (list) => {
            primaryStore.set(serialPortsAtom, list);
        });
        socket.on("serial_log", (msg) => {
            primaryStore.set(appendToLogAtom, msg);
        });

        // Network Table Events
        socket.on("new_session", (sessionID: number) => {
            console.log("Received new session from server");
            primaryStore.set(currentSessionIDAtom, sessionID);
            primaryStore.set(resetNTAtom);
        });
        socket.on("value_changed", (key: number, value: NTValue) => {
            console.log("Received value changed from server", key, value);
            primaryStore.set(ntValueAtomFamily(key), value);
        });
        socket.on("key_path_changed", (key: number, path: string) => {
            console.log("Received key path changed from server", key, path);
            primaryStore.set(setNTKeyFromPathAtom, path, key);
        });

        socket.connect();

        return () => {
            socket.removeAllListeners();
            socket.disconnect();
        };
    }, [socket]);
}