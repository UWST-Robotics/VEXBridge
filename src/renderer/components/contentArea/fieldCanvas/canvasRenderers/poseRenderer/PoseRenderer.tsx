import {Group, Line, Rect, Text} from 'react-konva';
import React from "react";
import Konva from "konva";
import lerp from "../../../../../utils/lerp.ts";
import lerpDegrees from "../../../../../utils/lerpDegrees.ts";

export interface PoseRendererProps {
    x: number;
    y: number;
    angle?: number;
    length?: number;
    width?: number;
    strokeColor?: string;
    label?: string;
    opacity?: number;
    disableLerp?: boolean;
}

const STROKE_COLOR = "#315495";
const WIDTH = 4;
const HEIGHT = 4;
const STEP_SIZE = 0.2;
const TEXT_WIDTH = 100;

export default function PoseRenderer(props: PoseRendererProps) {
    const {
        x,
        y,
        angle,
        length,
        width,
        strokeColor,
        label
    } = props;

    const translateGroupRef = React.useRef<Konva.Group>(null);
    const rotateGroupRef = React.useRef<Konva.Group>(null);
    const actualLength = length ?? WIDTH;
    const actualWidth = width ?? HEIGHT;
    const actualAngle = angle ?? 0;

    // Interpolate the position and angle
    React.useEffect(() => {
        if (!translateGroupRef.current || !rotateGroupRef.current)
            return () => {
            };
        if (props.disableLerp) {
            translateGroupRef.current.x(x);
            translateGroupRef.current.y(y);
            rotateGroupRef.current.rotation(actualAngle);
            return () => {
            };
        }

        const targetX = x;
        const targetY = y;
        const targetAngle = actualAngle % 360;

        const animation = new Konva.Animation(() => {
            const currentX = translateGroupRef.current?.x() ?? 0;
            const currentY = translateGroupRef.current?.y() ?? 0;
            const currentAngle = rotateGroupRef.current?.rotation() ?? 0;

            const newX = lerp(STEP_SIZE, currentX, targetX);
            const newY = lerp(STEP_SIZE, currentY, targetY);
            const newAngle = lerpDegrees(STEP_SIZE, currentAngle, targetAngle);

            translateGroupRef.current?.x(newX);
            translateGroupRef.current?.y(newY);
            rotateGroupRef.current?.rotation(newAngle);
        });

        animation.start();
        return () => animation.stop();
    }, [x, y, actualAngle, props.disableLerp]);

    return (
        <Group
            ref={translateGroupRef}
        >
            <Group
                ref={rotateGroupRef}
            >
                {/* Body */}
                <Rect
                    x={-actualLength / 2}
                    y={-actualWidth / 2}
                    width={actualLength}
                    height={actualWidth}
                    stroke={strokeColor ?? STROKE_COLOR}
                    strokeWidth={1}
                    opacity={props.opacity ?? 1}
                />

                {/* Angle */}
                {angle !== undefined && (
                    <Line
                        points={[0, 0, actualLength * 0.8, 0]}
                        stroke={strokeColor ?? STROKE_COLOR}
                        strokeWidth={1}
                        opacity={props.opacity ?? 1}
                    />
                )}
            </Group>

            {/* Label */}
            <Text
                x={-actualLength}
                y={-actualWidth / 2 - 8}
                text={label}
                fontSize={3.5}
                fontVariant={"bold"}
                width={actualLength * 2}
                align={"center"}
                fill={"#aaa"}
                opacity={props.opacity ?? 1}
            />
            <Text
                x={-TEXT_WIDTH / 2}
                y={-actualWidth / 2 - 4}
                text={`(${x.toFixed(2)}, ${y.toFixed(2)}, ${angle?.toFixed(2) ?? "0"})`}
                fontSize={2.5}
                width={TEXT_WIDTH}
                align={"center"}
                fill={"#aaa"}
                opacity={props.opacity ?? 1}
            />
        </Group>
    )
}

