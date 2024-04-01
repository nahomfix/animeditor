import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RedoIcon from "@mui/icons-material/Redo";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import UndoIcon from "@mui/icons-material/Undo";
import { IconButton, Stack } from "@mui/material";
import { useLottie } from "lottie-react";
import { FC, useEffect } from "react";
import { useEditorStore } from "../store";

export const Viewer: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const undos = useEditorStore((state) => state.undos);
    const redos = useEditorStore((state) => state.redos);
    const setAnimationItem = useEditorStore((state) => state.setAnimationItem);
    const resetSelectedLayerId = useEditorStore(
        (state) => state.resetSelectedLayerId
    );

    const { View, play, pause, stop, animationItem, animationLoaded } =
        useLottie(
            {
                animationData: animationJSON,
                loop: true,
                autoPlay: true,
                renderer: "canvas",
                rendererSettings: {
                    className: "lottie-animation-canvas",
                },
            },
            {
                height: 500,
                width: 800,
                border: "2px dashed #f3f6f8",
            }
        );

    // useEffect(() => {
    //     if (animationLoaded) {
    //         const frames: string[] = [];
    //         const totalFrames = animationItem?.totalFrames ?? 0;
    //         const canvas = document.querySelector(
    //             ".lottie-animation-canvas"
    //         ) as HTMLCanvasElement;

    //         for (let i = 0; i < totalFrames; i++) {
    //             animationItem?.goToAndStop(i, true);
    //             const frameImage: string = canvas?.toDataURL();
    //             frames.push(frameImage);
    //         }

    //         setFrames(frames);
    //     }
    // }, [animationItem, animationLoaded, setFrames]);

    useEffect(() => {
        if (animationLoaded) {
            setAnimationItem(animationItem);
        }
    }, [animationItem, animationLoaded, setAnimationItem]);

    return (
        <Stack alignItems="center" p={6} onClick={() => resetSelectedLayerId()}>
            {View}
            <Stack
                direction="row"
                justifyContent="center"
                sx={{
                    mt: 6,
                    alignSelf: "stretch",
                    backgroundColor: "#ffffff",
                }}
            >
                <IconButton onClick={() => play()}>
                    <PlayCircleIcon fontSize="large" color="primary" />
                </IconButton>
                <IconButton onClick={() => pause()}>
                    <PauseCircleIcon fontSize="large" color="primary" />
                </IconButton>
                <IconButton onClick={() => stop()}>
                    <StopCircleIcon fontSize="large" color="primary" />
                </IconButton>
                <IconButton disabled={undos.length === 0}>
                    <UndoIcon
                        fontSize="large"
                        color={undos.length === 0 ? "disabled" : "secondary"}
                    />
                </IconButton>
                <IconButton disabled={redos.length === 0}>
                    <RedoIcon
                        fontSize="large"
                        color={redos.length === 0 ? "disabled" : "secondary"}
                    />
                </IconButton>
            </Stack>
        </Stack>
    );
};
