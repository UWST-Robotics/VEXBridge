import StatusHeader from "./status/StatusHeader.tsx";
import {Paper} from "@mui/material";
import SceneGraph from "./scenegraph/SceneGraph.tsx";

export default function LeftSidebar() {
    return (
        <Paper
            elevation={1}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                minWidth: 300,
                overflowX: 'hidden'
            }}
        >
            <StatusHeader/>
            <SceneGraph/>
        </Paper>
    )
}