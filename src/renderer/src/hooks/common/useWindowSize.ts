import React from "react";

export default function useWindowSize() {
    const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = React.useState<number>(window.innerHeight);

    const onResize = React.useCallback(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }, []);

    React.useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [onResize]);

    return [windowWidth, windowHeight] as const;
}