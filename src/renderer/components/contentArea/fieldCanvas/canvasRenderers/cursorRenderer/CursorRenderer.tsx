import React from "react";
import {Group, Line, Rect} from "react-konva";
import Konva from "konva";
import CoordinatesRenderer from "./CoordinatesRenderer.tsx";
import useClientSettings from "../../../../../hooks/settings/useClientSettings.ts";

export interface CursorRendererProps {
    canvasSize: number;
}

export default function CursorRenderer(props: CursorRendererProps) {
    const [cursorX, setCursorX] = React.useState(0);
    const [cursorY, setCursorY] = React.useState(0);
    const [isCursorVisible, setIsCursorVisible] = React.useState(false);
    const [clientSettings] = useClientSettings();

    const {canvasSize} = props;

    const onMouseMove = React.useCallback((event: Konva.KonvaEventObject<MouseEvent>) => {
        const pos = event.currentTarget?.getRelativePointerPosition();
        if (!pos)
            return;

        setCursorX(pos.x);
        setCursorY(pos.y);
    }, [canvasSize]);

    if (!clientSettings.enableFieldCursor)
        return null;

    return (
        <Group
            x={canvasSize / 2}
            y={canvasSize / 2}
            scaleX={canvasSize / 144}
            scaleY={canvasSize / 144}
            onMouseMove={onMouseMove}
            onMouseEnter={() => setIsCursorVisible(true)}
            onMouseLeave={() => setIsCursorVisible(false)}
        >
            <Rect
                x={-72}
                y={-72}
                width={144}
                height={144}
                fill={"transparent"}
            />
            {isCursorVisible && (
                <Group
                    x={cursorX}
                    y={cursorY}
                >
                    <Line
                        points={[-canvasSize, 0, canvasSize, 0]}
                        stroke={"#fff"}
                        strokeWidth={0.2}
                        opacity={0.3}
                        dashEnabled={true}
                        dash={[1, 1]}
                    />
                    <Line
                        points={[0, -canvasSize, 0, canvasSize]}
                        stroke={"#fff"}
                        strokeWidth={0.2}
                        opacity={0.3}
                        dashEnabled={true}
                        dash={[1, 1]}
                    />
                    <CoordinatesRenderer
                        cursorX={cursorX}
                        cursorY={cursorY}
                    />
                </Group>
            )}
        </Group>
    );
}