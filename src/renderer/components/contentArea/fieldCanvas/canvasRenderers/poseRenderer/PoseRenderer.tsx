import {Group, Line, Rect, Text} from 'react-konva';
import React from "react";
import Konva from "konva";
import lerp from "../../../../../utils/lerp.ts";
import lerpDegrees from "../../../../../utils/lerpDegrees.ts";
import useTransformedPose from "../../../../../hooks/common/useTransformedPose.ts";

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

    const targetPose = useTransformedPose({x, y, rotation: angle ?? 0});
    const translateGroupRef = React.useRef<Konva.Group>(null);
    const rotateGroupRef = React.useRef<Konva.Group>(null);
    const actualLength = length ?? WIDTH;
    const actualWidth = width ?? HEIGHT;

    // Interpolate the position and angle
    React.useEffect(() => {
        if (!translateGroupRef.current || !rotateGroupRef.current)
            return () => {
            };

        // Animation Disabled
        if (props.disableLerp) {
            translateGroupRef.current.x(targetPose.x);
            translateGroupRef.current.y(targetPose.y);
            rotateGroupRef.current.rotation(targetPose.rotation);
            return () => {
            };
        }

        // Animation Enabled
        const animation = new Konva.Animation(() => {
            // Get the current pose
            const currentPose = {
                x: translateGroupRef.current?.x() ?? 0,
                y: translateGroupRef.current?.y() ?? 0,
                rotation: rotateGroupRef.current?.rotation() ?? 0
            };

            // Lerp the pose
            const lerpedPose = {
                x: lerp(STEP_SIZE, currentPose.x, targetPose.x),
                y: lerp(STEP_SIZE, currentPose.y, targetPose.y),
                rotation: lerpDegrees(STEP_SIZE, currentPose.rotation, targetPose.rotation)
            };

            translateGroupRef.current?.x(lerpedPose.x);
            translateGroupRef.current?.y(lerpedPose.y);
            rotateGroupRef.current?.rotation(lerpedPose.rotation);
        });

        animation.start();
        return () => animation.stop();
    }, [targetPose]);

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
                x={-TEXT_WIDTH / 2}
                y={-actualWidth / 2 - 8}
                text={label}
                fontSize={3.5}
                fontVariant={"bold"}
                width={TEXT_WIDTH}
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

