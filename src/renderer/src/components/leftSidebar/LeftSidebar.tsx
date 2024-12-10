import {Paper} from "@mui/material";
import SceneGraph from "./scenegraph/SceneGraph.tsx";

export default function LeftSidebar() {
    return (
        <Paper
            elevation={1}
            style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 300,
                overflowY: "auto",
            }}
        >
            <SceneGraph/>
        </Paper>
    );
}