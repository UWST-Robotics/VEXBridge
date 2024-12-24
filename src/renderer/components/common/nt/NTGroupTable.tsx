import NTGroupInfo from "../../../../types/nt/NTGroupInfo.ts";
import {Table, TableBody} from "@mui/material";
import NTGroupTableRow from "./NTGroupTableRow.tsx";

export interface NTGroupTableProps {
    groupInfo: NTGroupInfo;
    blacklist?: string[];
}

export default function NTGroupTable(props: NTGroupTableProps) {
    const {groupInfo, blacklist} = props;

    return (
        <Table
            size={"small"}
            sx={{width: "100%"}}
        >
            <TableBody>
                {groupInfo.children.map(child => {
                    if (blacklist?.includes(child.name))
                        return null;
                    return (
                        <NTGroupTableRow
                            key={child.path}
                            groupInfo={child}
                        />
                    );
                })}
            </TableBody>
        </Table>
    );
}