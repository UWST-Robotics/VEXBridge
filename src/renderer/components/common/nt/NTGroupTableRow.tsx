import NTGroupInfo from "../../../../types/nt/NTGroupInfo.ts";
import {styled, TableCell, TableRow} from "@mui/material";
import useSelectPath from "../../../hooks/selectedPath/actions/useSelectPath.ts";
import useIsPathSelected from "../../../hooks/selectedPath/useIsPathSelected.ts";
import useNTValueFromPath from "../../../hooks/networkTable/useNTValueFromPath.ts";

export interface NTGroupTableRowProps {
    groupInfo: NTGroupInfo;
}

const StyledTableRow = styled(TableRow)(({theme}) => ({

    borderLeft: "4px solid transparent",

    "&:last-child td, &:last-child th": {
        border: 0
    },

    "&:hover": {
        cursor: "pointer",
        borderLeft: `4px solid ${theme.palette.primary.main}`
    },
    "&.Mui-selected": {
        borderLeft: `4px solid ${theme.palette.primary.main}`
    }
}));

export default function NTGroupTableRow(props: NTGroupTableRowProps) {
    const value = useNTValueFromPath(props.groupInfo.path);

    const isSelected = useIsPathSelected(props.groupInfo.path);
    const selectPath = useSelectPath();

    return (
        <StyledTableRow
            hover
            onClick={() => selectPath(props.groupInfo.path)}
            selected={isSelected}
        >
            <TableCell>{props.groupInfo.name}</TableCell>
            <TableCell>{value}</TableCell>
        </StyledTableRow>
    );
}