import CircleIcon from "@mui/icons-material/Circle";
import { Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { loadAnimation } from "../utils/editor";

export const FilePicker: FC = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    useEffect(() => {
        if (acceptedFiles.length !== 0) {
            loadAnimation(acceptedFiles[0]);
        }
    }, [acceptedFiles]);

    return (
        <Container>
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
            <Dropzone {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop some file here or click to select a file</p>
            </Dropzone>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const Dropzone = styled.div`
    width: 600px;
    height: 200px;
    border: 1px dashed gray;
    min-height: 80px;
    display: grid;
    place-items: center;
    cursor: pointer;
    border-radius: 8px;
`;
