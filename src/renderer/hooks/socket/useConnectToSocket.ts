import {socketStatusAtom} from "./useSocketStatus.ts";
import primaryStore from "../primaryStore.ts";
import useSocket from "./useSocket.ts";
import React from "react";
import NTValue from "../../../types/nt/NTValue.ts";
import {serialStateAtom} from "../serialPorts/useSerialState.ts";
import {appendToLogAtom} from "../log/useAppendToLog.ts";
import {serialListAtom} from "../serialPorts/useSerialList.ts";
import {fetchInitialStateAtom} from "../initialization/useFetchInitialState.ts";
import {setNTKeyFromPathAtom} from "../networkTable/actions/useSetNTKeyFromPath.ts";
import {updateNTValueAtom} from "../networkTable/actions/useUpdateNTValue.ts";
import {resetNTAtom} from "../networkTable/actions/useResetNT.ts";

export default function useConnectToSocket() {
    const socket = useSocket();

    React.useEffect(() => {

        // Socket Events
        socket.on("connect", () => {
            console.log("Connected to socket");
            primaryStore.set(socketStatusAtom, "connected");
            primaryStore.set(fetchInitialStateAtom).catch(console.error);
        });
        socket.on("connect_error", (error: Error) => {
            console.error("Failed to connect to socket", error);
            primaryStore.set(socketStatusAtom, "disconnected");
        });
        socket.on("disconnect", () => {
            console.log("Disconnected from socket");
            primaryStore.set(socketStatusAtom, "disconnected");
        });

        // Reset Events
        socket.on("reset", () => {
            console.log("Received reset from server");
            primaryStore.set(resetNTAtom);
        });

        // Serial Events
        socket.on("serial_state", (state) => {
            console.log("Received serial state from server", state);
            primaryStore.set(serialStateAtom, state);
        });
        socket.on("serial_list", (list) => {
            console.log("Received serial list from server", list);
            primaryStore.set(serialListAtom, list);
        });

        // Log Events
        socket.on("log", (msg) => {
            console.log("Received log from server", msg);
            primaryStore.set(appendToLogAtom, msg);
        });

        // Network Table Events
        socket.on("value_changed", (payload: [number, NTValue, number]) => {
            const [key, value, timestamp] = payload;
            primaryStore.set(updateNTValueAtom, key, value, timestamp);
        });
        socket.on("key_path_changed", (payload: [number, string]) => {
            const [key, path] = payload;
            primaryStore.set(setNTKeyFromPathAtom, path, key);
        });

        socket.connect();

        return () => {
            socket.removeAllListeners();
            socket.disconnect();
        };
    }, [socket]);
}