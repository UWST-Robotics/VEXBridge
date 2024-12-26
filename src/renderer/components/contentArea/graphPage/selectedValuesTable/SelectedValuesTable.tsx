import useSelectedPaths from "../../../../hooks/selectedPath/useSelectedPaths.ts";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SelectedValueTableRow from "./SelectedValueTableRow.tsx";

export default function SelectedValuesTable() {
    const selectedPaths = useSelectedPaths();

    return (
        <TableContainer sx={{marginTop: 2}}>
            <Table size={"small"}>
                <TableHead>
                    <TableRow>
                        <TableCell>Path</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Min</TableCell>
                        <TableCell>Max</TableCell>
                        <TableCell>Average</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedPaths.map((selectedPath) => (
                        <SelectedValueTableRow
                            key={selectedPath}
                            path={selectedPath}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}