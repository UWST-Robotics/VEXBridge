import React from "react";

export default function useComponentSize(ref: React.RefObject<HTMLElement>) {
    const [width, setWidth] = React.useState<number>(ref.current?.clientWidth ?? 0);
    const [height, setHeight] = React.useState<number>(ref.current?.clientHeight ?? 0);

    const onResize = React.useCallback(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        }
    }, [ref]);

    React.useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [onResize, ref]);

    return [width, height] as const;
}