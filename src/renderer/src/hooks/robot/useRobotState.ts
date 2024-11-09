import {atom, useAtomValue} from "jotai";
import RobotState from "../../../../types/RobotState.ts";

// Atoms
export const robotStateAtom = atom<RobotState>({isEnabled: false});

// Hooks
export default function useRobotState() {
    return useAtomValue(robotStateAtom);
}