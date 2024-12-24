import {IconButton, TableCell, TableRow, Typography} from "@mui/material";
import networkValueToString from "../../../../utils/networkValueToString.ts";
import useNTGroupInfo from "../../../../hooks/ntGroupInfo/useNTGroupInfo.ts";
import useDeselectPath from "../../../../hooks/selectedPath/actions/useDeselectPath.ts";
import {Clear} from "@mui/icons-material";
import useNTValueFromPath from "../../../../hooks/networkTable/useNTValueFromPath.ts";

export interface SelectedValueTableRowProps {
    path: string;
}

export default function SelectedValueTableRow(props: SelectedValueTableRowProps) {
    const groupInfo = useNTGroupInfo(props.path);
    const value = useNTValueFromPath(props.path);
    //const stats = usePathStats(props.path);
    const deselectPath = useDeselectPath();

    // TODO: Implement usePathStats
    const stats = {
        min: 0,
        max: 0,
        average: 0
    };

    return (
        <TableRow hover>
            <TableCell>
                <Typography
                    variant={"body1"}
                    color={"textPrimary"}
                    sx={{fontWeight: 600}}
                >
                    {groupInfo?.name || props.path}
                </Typography>
                <Typography
                    variant={"body2"}
                    color={"textSecondary"}
                    sx={{fontSize: 12}}
                >
                    {props.path}
                </Typography>
            </TableCell>
            <TableCell>
                {networkValueToString(value)}
            </TableCell>
            <TableCell>
                {stats?.min.toFixed(2)}
            </TableCell>
            <TableCell>
                {stats?.max.toFixed(2)}
            </TableCell>
            <TableCell>
                {stats?.average.toFixed(2)}
            </TableCell>
            <TableCell sx={{padding: 0}}>
                <IconButton
                    onClick={() => deselectPath(props.path)}
                    size={"small"}
                >
                    <Clear fontSize={"small"}/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}