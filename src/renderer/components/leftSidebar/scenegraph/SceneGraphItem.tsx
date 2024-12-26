import {Box, ListItemButton, Typography} from "@mui/material";
import ColoredListItem from "../../common/ColoredListItem.tsx";
import networkValueToString from "../../../utils/networkValueToString.ts";
import useSelectPath from "../../../hooks/selectedPath/actions/useSelectPath.ts";
import useIsPathSelected from "../../../hooks/selectedPath/useIsPathSelected.ts";
import NTValue from "../../../../types/nt/NTValue.ts";

export interface SceneGraphItemProps {
    name: string;
    path: string;
    value: NTValue;
    depth?: number;
}

export default function SceneGraphItem(props: SceneGraphItemProps) {
    const selectPath = useSelectPath();
    const isPathSelected = useIsPathSelected(props.path);

    const {name, path, value} = props;

    const valueText = networkValueToString(value);
    const depth = props.depth || 0;

    if (value === undefined || value === null)
        return null;
    return (
        <ColoredListItem
            intent={"success"}
            disablePadding
        >
            <ListItemButton
                selected={isPathSelected}
                onClick={() => selectPath(path)}
                disableGutters
                dense
                sx={{
                    borderRadius: 2,
                    paddingLeft: depth * 2
                }}
            >
                <Box
                    sx={{}}
                >
                    <Typography>
                        {name}
                    </Typography>
                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: 12,
                            marginRight: 1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 200
                        }}
                    >
                        {valueText}
                    </Typography>
                </Box>
            </ListItemButton>
        </ColoredListItem>
    );
}