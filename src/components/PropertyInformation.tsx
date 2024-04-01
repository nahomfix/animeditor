import { Grid, Stack, Typography } from "@mui/material";
import hexRgb from "hex-rgb";
import { FC, useState } from "react";
import { ChromePicker } from "react-color";
import rgbHex from "rgb-hex";
import styled from "styled-components";
import { useEditorStore } from "../store";
import { Layer } from "../types";
import { ParsedColor } from "../types/colors";
import {
    changeAllColor,
    changeColor,
    getLayerPosition,
    getLayerScale,
} from "../utils/editor";

export const PropertyInformation: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const setAnimationJSON = useEditorStore((state) => state.setAnimationJSON);
    const selectedLayerId = useEditorStore((state) => state.selectedLayerId);
    const colors = useEditorStore((state) => state.colors);
    const uniqueColors = useEditorStore((state) => state.uniqueColors);
    const opacity = useEditorStore((state) => state.opacity);
    const scaleX = useEditorStore((state) => state.scaleX);
    const scaleY = useEditorStore((state) => state.scaleY);
    const positionX = useEditorStore((state) => state.positionX);
    const positionY = useEditorStore((state) => state.positionY);
    const rotation = useEditorStore((state) => state.rotation);
    const setRotation = useEditorStore((state) => state.setRotation);
    const setScale = useEditorStore((state) => state.setScale);
    const setPosition = useEditorStore((state) => state.setPosition);
    const setOpacity = useEditorStore((state) => state.setOpacity);

    const changeOpacity = (opacity: number) => {
        const currentAnimationJSON = {
            ...animationJSON,
        };
        const currentLayer = currentAnimationJSON.layers?.find(
            (layer: Layer) => layer.ind === selectedLayerId
        );

        if (currentLayer["ks"]["o"]["a"] === 0) {
            currentLayer["ks"]["o"]["k"] = opacity;
            setAnimationJSON(currentAnimationJSON);
            setOpacity(opacity);
        }
    };

    const changeRotation = (rotation: number) => {
        const currentAnimationJSON = {
            ...animationJSON,
        };
        const currentLayer = currentAnimationJSON.layers?.find(
            (layer: Layer) => layer.ind === selectedLayerId
        );

        if (currentLayer["ks"]["r"]["a"] === 0) {
            currentLayer["ks"]["r"]["k"] = rotation;
            setAnimationJSON(currentAnimationJSON);
            setRotation(rotation);
        }
    };

    const changePosition = (position: number[]) => {
        const currentAnimationJSON = {
            ...animationJSON,
        };
        const currentLayer = currentAnimationJSON.layers?.find(
            (layer: Layer) => layer.ind === selectedLayerId
        );

        if (currentLayer["ks"]["p"]["a"] === 0) {
            currentLayer["ks"]["p"]["k"] = position;
            setAnimationJSON(currentAnimationJSON);
            setPosition(position);
        }
    };

    const changeScale = (scale: number[]) => {
        const currentAnimationJSON = {
            ...animationJSON,
        };
        const currentLayer = currentAnimationJSON.layers?.find(
            (layer: Layer) => layer.ind === selectedLayerId
        );

        if (currentLayer["ks"]["s"]["a"] === 0) {
            currentLayer["ks"]["s"]["k"] = scale;
            setAnimationJSON(currentAnimationJSON);
            setScale(scale);
        }
    };

    return (
        <Stack p={2} spacing={3}>
            <Stack spacing={1}>
                <Typography variant="subtitle2">Unique Colors</Typography>
                <Grid container position="relative" spacing={1}>
                    {uniqueColors.map((color: ParsedColor, index: number) => (
                        <Grid key={index} item>
                            <ColorPreviewPicker key={index} color={color} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>

            <Stack spacing={1}>
                <Typography variant="subtitle2">All Colors</Typography>
                <Grid container position="relative" spacing={1}>
                    {colors.map((color: ParsedColor, index: number) => (
                        <Grid key={index} item>
                            <ColorPreviewPicker key={index} color={color} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>

            {selectedLayerId && (
                <>
                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Opacity</Typography>
                        <Stack direction="row" position="relative" spacing={2}>
                            <Input
                                min={0}
                                max={100}
                                type="number"
                                value={opacity}
                                onChange={(e) => {
                                    const newOpacity = e.target.value;
                                    changeOpacity(Number(newOpacity));
                                }}
                            />
                        </Stack>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Scale</Typography>
                        <Stack direction="row" position="relative" spacing={1}>
                            <Input
                                min={0}
                                max={100}
                                type="number"
                                value={scaleX}
                                onChange={(e) => {
                                    const newScaleX = Number(e.target.value);
                                    changeScale([
                                        newScaleX,
                                        getLayerScale(
                                            selectedLayerId as number,
                                            animationJSON
                                        )[1],
                                    ]);
                                }}
                            />
                            <Input
                                min={0}
                                max={100}
                                type="number"
                                value={scaleY}
                                onChange={(e) => {
                                    const newScaleY = Number(e.target.value);
                                    changeScale([
                                        newScaleY,
                                        getLayerScale(
                                            selectedLayerId as number,
                                            animationJSON
                                        )[1],
                                    ]);
                                }}
                            />
                        </Stack>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Position</Typography>
                        <Stack direction="row" position="relative" spacing={1}>
                            <Input
                                min={0}
                                max={animationJSON.w}
                                type="number"
                                value={positionX}
                                onChange={(e) => {
                                    const newPositionX = e.target.value;
                                    changePosition([
                                        Number(newPositionX),
                                        getLayerPosition(
                                            selectedLayerId as number,
                                            animationJSON
                                        )[1],
                                    ]);
                                }}
                            />
                            <Input
                                min={0}
                                max={animationJSON.h}
                                type="number"
                                value={positionY}
                                onChange={(e) => {
                                    const newPositionY = e.target.value;
                                    changePosition([
                                        getLayerPosition(
                                            selectedLayerId as number,
                                            animationJSON
                                        )[0],
                                        Number(newPositionY),
                                    ]);
                                }}
                            />
                        </Stack>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Rotation</Typography>
                        <Stack direction="row" position="relative" spacing={2}>
                            <Input
                                min={0}
                                max={360}
                                type="number"
                                value={rotation}
                                onChange={(e) => {
                                    const newOpacity = e.target.value;
                                    changeRotation(Number(newOpacity));
                                }}
                            />
                        </Stack>
                    </Stack>
                </>
            )}
        </Stack>
    );
};

const ColorPreviewPicker = ({ color }: { color: ParsedColor }) => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const selectedLayerId = useEditorStore((state) => state.selectedLayerId);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [pickerColor, setPickerColor] = useState("#ffffff");

    const colorRgba = [
        hexRgb(color.color).red,
        hexRgb(color.color).green,
        hexRgb(color.color).blue,
        hexRgb(color.color).alpha,
    ];

    return (
        <Container>
            <ColorPreview
                color={rgbHex(colorRgba[0], colorRgba[1], colorRgba[2])}
                onClick={() => setDisplayColorPicker(true)}
            />
            {displayColorPicker ? (
                <PickerContainer>
                    <PickerWrapper
                        onClick={() => setDisplayColorPicker(false)}
                    />
                    <ChromePicker
                        color={pickerColor}
                        onChange={(newColor) => {
                            setPickerColor(newColor.hex);

                            if (selectedLayerId) {
                                changeColor(
                                    color.layerIndex,
                                    color.shapeIndex,
                                    color.itemType,
                                    color.itemIndex,
                                    newColor.hex,
                                    animationJSON
                                );
                            } else {
                                changeAllColor(
                                    color.color,
                                    newColor.hex,
                                    animationJSON
                                );
                            }
                        }}
                    />
                </PickerContainer>
            ) : null}
        </Container>
    );
};

const Container = styled.div`
    position: relative;
`;

const PickerContainer = styled.div`
    position: absolute;
    z-index: 2;
`;

const PickerWrapper = styled.div`
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
`;

const ColorPreview = styled.div<{ color: string }>`
    background-color: ${({ color }) => (color ? `#${color}` : "inherit")};
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 0.5px solid gray;
    cursor: pointer;
`;

const Input = styled.input`
    min-width: 80px;
`;
