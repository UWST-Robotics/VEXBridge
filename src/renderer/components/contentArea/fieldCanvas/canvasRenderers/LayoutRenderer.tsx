import {Image} from "react-konva";
import React from "react";

export interface LayoutRendererProps {
    canvasSize: number;
    opacity?: number;
}

export default function LayoutRenderer(props: LayoutRendererProps) {
    // const [settings] = useSettings();

    const fieldImage = React.useMemo(() => {
        const image = new window.Image();
        image.src = `/fields/HighStakes_VEXU-Match.png`;
        return image;
    }, []);

    return (
        <Image
            width={props.canvasSize}
            height={props.canvasSize}
            image={fieldImage}
            opacity={props.opacity ?? 1}
        />
    );
}