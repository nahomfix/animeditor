import { Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FC } from "react";
import { useEditorStore } from "../store";
import { Animation } from "../types";
import { getBodymovinVersion, getName } from "../utils/editor";

export const AnimationInformation: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);

    return (
        <Stack p={2}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>File specification</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Bodymovin version</TableCell>
                        <TableCell>
                            {getBodymovinVersion(animationJSON as Animation)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>
                            {getName(animationJSON as Animation)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Stack>
    );
};
