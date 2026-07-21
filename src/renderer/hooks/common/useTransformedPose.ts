import Pose from "../../../types/Pose.ts";
import useClientSettings from "../settings/useClientSettings.ts";
import React from "react";
import transformPose from "../../utils/transformPose.ts";

export default function useTransformedPose(pose: Pose): Pose {
    const [settings] = useClientSettings();

    return React.useMemo(() => {
        return transformPose(settings, pose);
    }, [pose, settings]);
}