import NTGroupInfo from "../../../../../../types/nt/NTGroupInfo.ts";
import {Circle, Group, Line} from "react-konva";
import React from "react";
import useNTValueFromPath from "../../../../../hooks/networkTable/useNTValueFromPath.ts";

export interface NetworkPoseRendererProps {
    lineGroup: NTGroupInfo;
}

export default function NetworkLineRenderer(props: NetworkPoseRendererProps) {
    const {lineGroup} = props;
    const color = useNTValueFromPath(lineGroup.path + "/color");
    const xValues = useNTValueFromPath(lineGroup.path + "/x");
    const yValues = useNTValueFromPath(lineGroup.path + "/y");

    const points = React.useMemo(() => {
        const xNumbers = Array.isArray(xValues) ? xValues : [];
        const yNumbers = Array.isArray(yValues) ? yValues : [];

        return xNumbers.map((x, i) => [x, yNumbers[i]]);
    }, [xValues, yValues]);

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