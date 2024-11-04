import primaryStore from "../primaryStore.ts";
import React from "react";
import NetworkTableRecord from "../../types/NetworkTableRecord.ts";
import {logAtom} from "../log/useLog.ts";
import {updateNTValueAtomFamily} from "../networkTable/actions/useUpdateNTValue.ts";
import NTRecord from "../../../../types/NTRecord.ts";

export default function useElectronEvents() {
    React.useEffect(() => {
        electronAPI?.onLog((message: string) => {
            console.log(message);
            primaryStore.set(logAtom, (prev) => {
                return [...prev, {
                    timestamp: new Date(),
                    message: message
                }];
            });
        });

        electronAPI?.onUpdateRecord((record: NTRecord) => {
            primaryStore.set(updateNTValueAtomFamily(record.key), record.value);
        });

        electronAPI?.onSetAllRecords((records: NetworkTableRecord[]) => {
            records.forEach((record) => {
                primaryStore.set(updateNTValueAtomFamily(record.key), record.value);
            });
        });

        electronAPI?.getAllRecords();

        return electronAPI?.removeAllListeners;
    }, []);
}