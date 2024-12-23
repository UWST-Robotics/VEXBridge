import NTGroupInfo from "../../../../../types/nt/NTGroupInfo.ts";
import {Circle, Group, Line} from "react-konva";
import useNTValue from "../../../../../hooks/networkTable/useNTValue.ts";
import useNTValuesOfGroup from "../../../../../hooks/networkTable/useNTValuesOfGroup.ts";
import React from "react";

export interface NetworkPoseRendererProps {
    lineGroup: NTGroupInfo;
}

export default function NetworkLineRenderer(props: NetworkPoseRendererProps) {
    const {lineGroup} = props;
    const color = useNTValue(lineGroup.path + "/color");
    const ntValues = useNTValuesOfGroup(lineGroup.path);

    const points = React.useMemo(() => {
        const points: number[][] = [];
        for (const pointNTGroup of lineGroup.children) {
            const path = pointNTGroup.path;
            const x = ntValues[path + "/x"];
            const y = ntValues[path + "/y"];

            if (x !== undefined && y !== undefined)
                points.push([Number(x), Number(y)]);
        }

        return points;
    }, [lineGroup, ntValues]);

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
    )
}