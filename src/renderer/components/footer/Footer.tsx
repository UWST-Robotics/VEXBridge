import {Paper, Skeleton} from "@mui/material";
import SerialButton from "./serial/SerialButton.tsx";
import {Suspense} from "react";
import SessionButton from "./session/SessionButton.tsx";

export default function Footer() {
    return (
        <Paper
            sx={{
                borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                paddingLeft: 2,
                paddingRight: 2,
            }}
        >
            <Suspense fallback={
                <Skeleton
                    width={133}
                    height={30}
                    variant={"rectangular"}
                    animation={"wave"}
                />
            }>
                <SerialButton/>
            </Suspense>
            <Suspense fallback={
                <Skeleton
                    width={133}
                    height={30}
                    variant={"rectangular"}
                    animation={"wave"}
                />
            }>
                <SessionButton/>
            </Suspense>
        </Paper>
    );
}