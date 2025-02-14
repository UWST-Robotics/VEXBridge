import {Button} from "@mui/material";
import useClearGraph from "../../../hooks/graph/actions/useClearGraph.ts";

export default function ClearGraphButton() {
    const clearGraph = useClearGraph();

    return (
        <Button
            variant={"outlined"}
            color={"error"}
            onClick={clearGraph}
            sx={{margin: 1}}
        >
            Clear Graph
        </Button>
    )
}