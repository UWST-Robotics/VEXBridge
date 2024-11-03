import {Group, Text} from "react-konva";
import React from "react";

export interface CompassRendererProps {
    canvasSize: number;
}

const PADDING = 10;
const FILL_COLOR = "#999";

export default function CompassRenderer(props: CompassRendererProps) {
    const {canvasSize} = props;

    return (
        <Group>
            <Text
                x={0}
                y={PADDING}
                width={canvasSize}
                text={"90°"}
                fill={FILL_COLOR}
                fontSize={20}
                align={"center"}
                shadowColor={"#000"}
                shadowBlur={7}
                shadowOpacity={1}
            />
            <Text
                x={0}
                y={canvasSize - PADDING - 20}
                width={canvasSize}
                text={"270°"}
                fill={FILL_COLOR}
                fontSize={20}
                align={"center"}
                shadowColor={"#000"}
                shadowBlur={7}
                shadowOpacity={1}
            />
            <Text
                x={PADDING}
                y={canvasSize / 2 - 10}
                width={canvasSize}
                text={"180°"}
                fill={FILL_COLOR}
                fontSize={20}
                align={"left"}
                shadowColor={"#000"}
                shadowBlur={7}
                shadowOpacity={1}
            />
            <Text
                x={-PADDING}
                y={canvasSize / 2 - 10}
                width={canvasSize}
                text={"0°"}
                fill={FILL_COLOR}
                fontSize={20}
                align={"right"}
                shadowColor={"#000"}
                shadowBlur={7}
                shadowOpacity={1}
            />
        </Group>
    )
}