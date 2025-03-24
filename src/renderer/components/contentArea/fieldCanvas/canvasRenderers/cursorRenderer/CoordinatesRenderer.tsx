import React from "react";
import {Text} from "react-konva";

enum CursorPosition {
    TOP_LEFT = 0,
    TOP_RIGHT = 1,
    BOTTOM_LEFT = 2,
    BOTTOM_RIGHT = 3
}

export interface CursorRendererProps {
    cursorX: number;
    cursorY: number;
}

const TEXT_WIDTH = 70;
const HORIZONTAL_EDGE_THRESHOLD = 54;
const VERTICAL_EDGE_THRESHOLD = 64;

export default function CoordinatesRenderer(props: CursorRendererProps) {
    const {cursorX, cursorY} = props;

    const cursorPosition = React.useMemo(() => {
        if (cursorX < -HORIZONTAL_EDGE_THRESHOLD &&
            cursorY < -VERTICAL_EDGE_THRESHOLD)
            return CursorPosition.BOTTOM_RIGHT;
        if (cursorX < -HORIZONTAL_EDGE_THRESHOLD)
            return CursorPosition.TOP_RIGHT;
        if (cursorY < -VERTICAL_EDGE_THRESHOLD)
            return CursorPosition.BOTTOM_LEFT;

        return CursorPosition.TOP_LEFT;
    }, [cursorX, cursorY]);

    return (
        <Text
            x={
                cursorPosition === CursorPosition.TOP_LEFT ||
                cursorPosition === CursorPosition.BOTTOM_LEFT ? -TEXT_WIDTH - 1 : 1}
            y={
                cursorPosition === CursorPosition.TOP_LEFT ||
                cursorPosition === CursorPosition.TOP_RIGHT ? -TEXT_WIDTH - 1 : 1}
            width={TEXT_WIDTH}
            height={TEXT_WIDTH}
            align={
                cursorPosition === CursorPosition.TOP_LEFT ||
                cursorPosition === CursorPosition.BOTTOM_LEFT ? "right" : "left"}
            verticalAlign={
                cursorPosition === CursorPosition.TOP_LEFT ||
                cursorPosition === CursorPosition.TOP_RIGHT ? "bottom" : "top"}
            text={`${cursorX.toFixed()}, ${-cursorY.toFixed()}`}
            fontSize={3}
            fill={"#aaa"}
        />
    );
}