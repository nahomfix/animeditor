import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { IconButton, Stack } from "@mui/material";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { FC, useRef } from "react";
import styled from "styled-components";
import { useEditorStore } from "../store";

export const Viewer: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);

    return (
        <Stack alignItems="center" p={6}>
            <LottieContainer
                lottieRef={lottieRef}
                animationData={animationJSON}
            />
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
            </Stack>
        </Stack>
    );
};

const LottieContainer = styled(Lottie)`
    height: 500px;
    width: 800px;
    border: 2px dashed lightgrey;
`;
