import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RedoIcon from "@mui/icons-material/Redo";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import UndoIcon from "@mui/icons-material/Undo";
import { IconButton, Stack } from "@mui/material";
import { LottieRefCurrentProps, useLottie } from "lottie-react";
import { FC, useRef } from "react";
import { useEditorStore } from "../store";

export const Viewer: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);

    const { View } = useLottie(
        {
            animationData: animationJSON,
            loop: true,
            autoPlay: true,
            renderer: "canvas",
        },
        {
            height: "500px",
            width: "800px",
            border: "2px dashed lightgrey",
        }
    );

    return (
        <Stack alignItems="center" p={6}>
            {View}
            <Stack
                direction="row"
                justifyContent="center"
                sx={{
                    mt: 6,
                    alignSelf: "stretch",
                    backgroundColor: "#f8f0fb",
                }}
            >
                <IconButton onClick={() => lottieRef.current?.play()}>
                    <PlayCircleIcon fontSize="large" color="primary" />
                </IconButton>
                <IconButton onClick={() => lottieRef.current?.pause()}>
                    <PauseCircleIcon fontSize="large" color="primary" />
                </IconButton>
                <IconButton onClick={() => lottieRef.current?.stop()}>
                    <StopCircleIcon fontSize="large" color="primary" />
                </IconButton>
                <IconButton>
                    <UndoIcon fontSize="large" color="secondary" />
                </IconButton>
                <IconButton>
                    <RedoIcon fontSize="large" color="secondary" />
                </IconButton>
            </Stack>
        </Stack>
    );
};
