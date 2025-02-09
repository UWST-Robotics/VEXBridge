import useSelectedPaths from "../../../hooks/selectedPath/useSelectedPaths.ts";
import NonIdealState from "../../common/NonIdealState.tsx";
import {WarningAmber} from "@mui/icons-material";

export default function NoItemsSelectedCard() {
    const selectedPaths = useSelectedPaths();
    const isPathSelected = selectedPaths.length > 0;
    if (isPathSelected)
        return null;

    return (
        <NonIdealState
            icon={<WarningAmber sx={{fontSize: 60}}/>}
            title={"No Values Selected"}
            description={"Select one or more values on the left to view them here"}
        />
    )
}