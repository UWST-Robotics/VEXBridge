import {Image} from "react-konva";
import React from "react";
import useClientSettings from "../../../../hooks/settings/useClientSettings.ts";

export interface LayoutRendererProps {
    canvasSize: number;
    opacity?: number;
}

export default function LayoutRenderer(props: LayoutRendererProps) {
    const [clientSettings] = useClientSettings();

    const fieldImage = React.useMemo(() => {
        const image = new window.Image();
        image.src = `/fields/` + clientSettings.fieldLayoutID;
        return image;
    }, [clientSettings]);

    return (
        <Image
            width={props.canvasSize}
            height={props.canvasSize}
            image={fieldImage}
            opacity={props.opacity ?? 1}
        />
    );
}