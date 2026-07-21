import NTGroupInfo from "../../../../../../types/nt/NTGroupInfo.ts";
import {Circle, Group, Line} from "react-konva";
import React from "react";
import useNTValueFromPath from "../../../../../hooks/networkTable/useNTValueFromPath.ts";
import transformPose from "../../../../../utils/transformPose.ts";
import useClientSettings from "../../../../../hooks/settings/useClientSettings.ts";

export interface NetworkPoseRendererProps {
    lineGroup: NTGroupInfo;
}

export default function NetworkLineRenderer(props: NetworkPoseRendererProps) {
    const {lineGroup} = props;
    const color = useNTValueFromPath(lineGroup.path + "/color");
    const xValues = useNTValueFromPath(lineGroup.path + "/x");
    const yValues = useNTValueFromPath(lineGroup.path + "/y");
    const [settings] = useClientSettings();

    const points = React.useMemo(() => {
        const xNumbers = Array.isArray(xValues) ? xValues : [];
        const yNumbers = Array.isArray(yValues) ? yValues : [];

        // Transform the x and y values into a list of points
        return xNumbers.map((x, i) => {
            const transformedPose = transformPose(settings, {
                x: Number(x),
                y: Number(yNumbers[i]),
                rotation: 0
            });
            return [transformedPose.x, transformedPose.y];
        });
    }, [xValues, yValues, settings]);

    return (
        <Group>
            <Line
                points={points.flat()}
                stroke={color?.toString() ?? "#aaa"}
                strokeWidth={0.5}
                lineCap={"round"}
                lineJoin={"round"}
            />

            {points.map((point, i) => (
                <Circle
                    key={i}
                    x={point[0]}
                    y={point[1]}
                    radius={0.5}
                    fill={color?.toString() ?? "#fff"}
                />
            ))}
        </Group>
    );
}