import primaryStore from "../primaryStore.ts";
import React from "react";
import NetworkTableRecord from "../../types/NetworkTableRecord.ts";
import {logAtom} from "../log/useLog.ts";
import {updateNTValueAtomFamily} from "../networkTable/actions/useUpdateNTValue.ts";
import NTRecord from "../../../../types/NTRecord.ts";
import {serialPortsAtom} from "../serialPorts/useSerialPorts.ts";
import SerialPortInfo from "../../../../types/SerialPortInfo.ts";
import {serialStateAtom} from "../serialPorts/useSerialState.ts";
import SerialState from "../../../../types/SerialState.ts";
import RobotState from "../../../../types/RobotState.ts";
import {robotStateAtom} from "../robot/useRobotState.ts";
import {ntValueAtomFamily} from "../networkTable/useNTValue.ts";
import resetAtomFamily from "../../utils/resetAtomFamily.ts";
import {ntGroupInfoRoot} from "../networkTable/useNTGroupInfoRoot.ts";

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

            // Reset all values
            resetAtomFamily(ntValueAtomFamily);
            primaryStore.set(ntGroupInfoRoot, {
                name: "",
                path: "",
                children: []
            });

            // Set all new values
            records.forEach((record) => {
                primaryStore.set(updateNTValueAtomFamily(record.key), record.value);
            });
        });
        electronAPI?.onSerialPorts((ports: SerialPortInfo[]) => {
            primaryStore.set(serialPortsAtom, ports);
        });
        electronAPI?.onSerialState((state: SerialState) => {
            primaryStore.set(serialStateAtom, state);
        });
        electronAPI?.onRobotState((state: RobotState) => {
            primaryStore.set(robotStateAtom, state);
        });

        electronAPI?.getAllRecords();
        return electronAPI?.removeAllListeners;
    }, []);
}