import { FC, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { loadAnimation } from "../utils/editor";

export const FilePicker: FC = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    useEffect(() => {
        if (acceptedFiles.length !== 0) {
            console.log(acceptedFiles[0]);
            loadAnimation(acceptedFiles[0]);
        }
    }, [acceptedFiles]);

    return (
        <Container>
            <Dropzone {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop some file here or click to select a file</p>
            </Dropzone>
        </Container>
    );
};

const Container = styled.div``;

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
