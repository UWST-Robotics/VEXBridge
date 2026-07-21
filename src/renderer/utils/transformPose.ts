import ClientSettings from "../../types/db/ClientSettings.ts";
import Pose from "../../types/Pose.ts";

/**
 * Transforms a pose based on the client settings
 * @param settings - The client settings
 * @param pose - The pose to transform
 * @returns The transformed pose
 */
export default function transformPose(settings: ClientSettings, pose: Pose): Pose {
    const newPose = {...pose};

    // Swap axes
    if (settings.swapAxes) {
        const temp = newPose.x;
        newPose.x = newPose.y;
        newPose.y = temp;
    }

    // Mirror axes
    if (settings.mirrorXAxis)
        newPose.x = -newPose.x;
    if (settings.mirrorYAxis)
        newPose.y = -newPose.y;

    // Change Heading
    switch (settings.compassHead) {
        case "N":
            newPose.rotation = (newPose.rotation + 90) % 360;
            break;
        case "W":
            newPose.rotation = (newPose.rotation + 180) % 360;
            break;
        case "S":
            newPose.rotation = (newPose.rotation + 270) % 360;
            break;
    }

    // Reverse compass
    if (settings.reverseCompass)
        newPose.rotation = (360 - newPose.rotation) % 360;

    return newPose;
}