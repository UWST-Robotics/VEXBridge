import {Group, Text} from "react-konva";

export interface CompassRendererProps {
    canvasSize: number;
}

const PADDING = 8;
const FILL_COLOR = "#777";
const FONT_SIZE = 16;

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
                text={"270°"}
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
                text={"180°"}
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
                text={"0°"}
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