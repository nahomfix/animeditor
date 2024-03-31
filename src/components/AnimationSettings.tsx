import { Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FC } from "react";
import { useEditorStore } from "../store";
import {
    changeDuration,
    changeFrameRate,
    changeHeight,
    changeWidth,
} from "../utils/editor";

export const AnimationSettings: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const frameRate = useEditorStore((state) => state.frameRate);
    const duration = useEditorStore((state) => state.duration);
    const width = useEditorStore((state) => state.width);
    const height = useEditorStore((state) => state.height);
    const setWidth = useEditorStore((state) => state.setWidth);
    const setHeight = useEditorStore((state) => state.setHeight);
    const setFrameRate = useEditorStore((state) => state.setFrameRate);
    const setDuration = useEditorStore((state) => state.setDuration);

    return (
        <Stack p={2} spacing={2}>
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
                            <input
                                name="frameRate"
                                min={1}
                                type="number"
                                value={frameRate}
                                onChange={(e) => {
                                    const newFrameRate = Number(e.target.value);
                                    console.log(
                                        `New frame rate: ${newFrameRate}`
                                    );
                                    setFrameRate(newFrameRate);
                                    changeFrameRate(
                                        newFrameRate,
                                        animationJSON
                                    );
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Duration</TableCell>
                        <TableCell>
                            <input
                                name="duration"
                                min={1}
                                type="number"
                                value={duration}
                                onChange={(e) => {
                                    const newDuration = Number(e.target.value);
                                    console.log(`New duration: ${newDuration}`);
                                    setDuration(newDuration);
                                    changeDuration(newDuration, animationJSON);
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Width</TableCell>
                        <TableCell>
                            <input
                                name="width"
                                min={1}
                                type="number"
                                value={width}
                                onChange={(e) => {
                                    const newWidth = Number(e.target.value);
                                    console.log(`New width: ${newWidth}`);
                                    setWidth(newWidth);
                                    changeWidth(newWidth, animationJSON);
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Height</TableCell>
                        <TableCell>
                            <input
                                name="height"
                                min={1}
                                type="number"
                                value={height}
                                onChange={(e) => {
                                    const newHeight = Number(e.target.value);
                                    console.log(`New height: ${newHeight}`);
                                    setHeight(newHeight);
                                    changeHeight(newHeight, animationJSON);
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Stack>
    );
};
