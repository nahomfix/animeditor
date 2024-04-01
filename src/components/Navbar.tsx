import CircleIcon from "@mui/icons-material/Circle";
import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useEditorStore } from "../store";
import { captureFrames, exportFile } from "../utils/editor";

export const Navbar: FC = () => {
    const width = useEditorStore((state) => state.width);
    const height = useEditorStore((state) => state.height);
    const animationItem = useEditorStore((state) => state.animationItem);

    return (
        <Stack
            direction="row"
            sx={{
                backgroundColor: "#ffffff",
                py: 2,
                px: 4,
                borderBottom: "1px solid #f3f6f8",
            }}
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="row" alignItems="baseline" spacing={0.5}>
                <Typography variant="h5" fontWeight={900}>
                    Editor
                </Typography>
                <CircleIcon
                    color="primary"
                    sx={{
                        fontSize: "10px",
                    }}
                />
            </Stack>
            <Button
                variant="contained"
                onClick={() => {
                    const capturedFrames: string[] = [];
                    captureFrames(animationItem, (frame: string) => {
                        capturedFrames.push(frame);
                    });

                    console.log(capturedFrames);

                    exportFile(width, height, capturedFrames);
                }}
            >
                Export
            </Button>
        </Stack>
    );
};
