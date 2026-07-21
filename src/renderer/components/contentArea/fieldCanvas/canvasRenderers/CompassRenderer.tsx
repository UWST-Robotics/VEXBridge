import {Group, Text} from "react-konva";
import useTransformedPose from "../../../../hooks/common/useTransformedPose.ts";

export interface CompassRendererProps {
    canvasSize: number;
}

const PADDING = 8;
const FILL_COLOR = "#777";
const FONT_SIZE = 16;

export default function CompassRenderer(props: CompassRendererProps) {
    const {canvasSize} = props;
    const northPose = useTransformedPose({x: 0, y: 0, rotation: 270});
    const eastPose = useTransformedPose({x: 0, y: 0, rotation: 0});
    const southPose = useTransformedPose({x: 0, y: 0, rotation: 90});
    const westPose = useTransformedPose({x: 0, y: 0, rotation: 180});

    return (
        <Group>
            <Text
                x={0}
                y={PADDING}
                width={canvasSize}
                text={`${northPose.rotation}°`}
                fill={FILL_COLOR}
                fontSize={FONT_SIZE}
                align={"center"}
                shadowColor={"#000"}
                shadowBlur={7}
                shadowOpacity={1}
            />
            <Text
                x={0}
                y={canvasSize - PADDING - FONT_SIZE + 2}
                width={canvasSize}
                text={`${southPose.rotation}°`}
                fill={FILL_COLOR}
                fontSize={FONT_SIZE}
                align={"center"}
                shadowColor={"#000"}
                shadowBlur={7}
                shadowOpacity={1}
            />
            <Text
                x={PADDING}
                y={canvasSize / 2 - FONT_SIZE / 2 + 2}
                width={canvasSize}
                text={`${westPose.rotation}°`}
                fill={FILL_COLOR}
                fontSize={FONT_SIZE}
                align={"left"}
                shadowColor={"#000"}
                shadowBlur={7}
                shadowOpacity={1}
            />
            <Text
                x={-PADDING}
                y={canvasSize / 2 - FONT_SIZE / 2 + 2}
                width={canvasSize}
                text={`${eastPose.rotation}°`}
                fill={FILL_COLOR}
                fontSize={FONT_SIZE}
                align={"right"}
                shadowColor={"#000"}
                shadowBlur={7}
                shadowOpacity={1}
            />
        </Group>
    )
}