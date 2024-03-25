import { Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FC } from "react";
import { useEditorStore } from "../store";
import { Animation } from "../types";
import { getFirstFrame, getFrameRate, getLastFrame } from "../utils/editor";

export const AnimationInformation: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);

    return (
        <Stack p={2}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Information</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Frame Rate</TableCell>
                        <TableCell>
                            {getFrameRate(animationJSON as Animation)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>First Frame</TableCell>
                        <TableCell>
                            {getFirstFrame(animationJSON as Animation)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Last Frame</TableCell>
                        <TableCell>
                            {getLastFrame(animationJSON as Animation)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Stack>
    );
};
