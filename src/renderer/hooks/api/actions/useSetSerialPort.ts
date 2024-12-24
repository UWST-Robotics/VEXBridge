import {atom, useSetAtom} from "jotai";

const API_ENDPOINT = "/api/serial";

export const setSerialPortAtom = atom(null, async (_get, _set, serialPath: string, autoSelect = false) => {
    const apiBody = {
        serialPath,
        autoSelect
    };

    // Send the request to the API
    const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(apiBody)
    });

    // Check if the request was successful
    if (!response.ok)
        throw new Error(`Failed to set serial port: ${response.statusText}`);
});

export default function useSetSerialPort() {
    return useSetAtom(setSerialPortAtom);
}