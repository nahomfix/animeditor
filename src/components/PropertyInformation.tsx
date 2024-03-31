import { Stack, Typography } from "@mui/material";
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
    extractAllColors,
    getLayerOpacity,
    getLayerPosition,
    getLayerRotation,
    getLayerScale,
} from "../utils/editor";

export const PropertyInformation: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const setAnimationJSON = useEditorStore((state) => state.setAnimationJSON);
    const selectedLayerId = useEditorStore((state) => state.selectedLayerId);
    const colors = useEditorStore((state) => state.colors);

    const uniqueColors = extractAllColors(animationJSON);

    const changeOpacity = (opacity: number) => {
        const currentAnimationJSON = {
            ...animationJSON,
        };
        const currentLayer = currentAnimationJSON.layers?.find(
            (layer: Layer) => layer.ind === selectedLayerId
        );
        currentLayer["ks"]["o"]["k"] = opacity;
        setAnimationJSON(currentAnimationJSON);
    };

    const changeRotation = (rotation: number) => {
        const currentAnimationJSON = {
            ...animationJSON,
        };
        const currentLayer = currentAnimationJSON.layers?.find(
            (layer: Layer) => layer.ind === selectedLayerId
        );
        currentLayer["ks"]["r"]["k"] = rotation;
        setAnimationJSON(currentAnimationJSON);
    };

    const changePosition = (position: number[]) => {
        const currentAnimationJSON = {
            ...animationJSON,
        };
        const currentLayer = currentAnimationJSON.layers?.find(
            (layer: Layer) => layer.ind === selectedLayerId
        );
        currentLayer["ks"]["p"]["k"] = position;
        setAnimationJSON(currentAnimationJSON);
    };

    const changeScale = (scale: number[]) => {
        const currentAnimationJSON = {
            ...animationJSON,
        };
        const currentLayer = currentAnimationJSON.layers?.find(
            (layer: Layer) => layer.ind === selectedLayerId
        );
        currentLayer["ks"]["s"]["k"] = scale;
        setAnimationJSON(currentAnimationJSON);
    };

    return (
        <Stack p={2} spacing={3}>
            <Stack spacing={1}>
                <Typography variant="subtitle2">Unique Colors</Typography>
                <Stack
                    direction="row"
                    position="relative"
                    spacing={1}
                    flexWrap="wrap"
                >
                    {uniqueColors.map((color: string, index: number) => (
                        <UniqueColorPreviewPicker key={index} color={color} />
                    ))}
                </Stack>
            </Stack>

            <Stack spacing={1}>
                <Typography variant="subtitle2">All Colors</Typography>
                <Stack
                    direction="row"
                    position="relative"
                    spacing={1}
                    flexWrap="wrap"
                >
                    {colors.map((color: ParsedColor, index: number) => (
                        <ColorPreviewPicker key={index} color={color} />
                    ))}
                </Stack>
            </Stack>

            {selectedLayerId && (
                <>
                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Opacity</Typography>
                        <Stack direction="row" position="relative" spacing={2}>
                            <input
                                min={0}
                                max={100}
                                type="number"
                                defaultValue={getLayerOpacity(
                                    selectedLayerId as number,
                                    animationJSON
                                )}
                                key={getLayerOpacity(
                                    selectedLayerId as number,
                                    animationJSON
                                )}
                                onBlur={(e) => {
                                    const newOpacity = e.target.value;
                                    changeOpacity(Number(newOpacity));
                                }}
                            />
                        </Stack>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Scale</Typography>
                        <Stack direction="row" position="relative" spacing={1}>
                            <input
                                min={0}
                                max={100}
                                type="number"
                                defaultValue={
                                    getLayerScale(
                                        selectedLayerId as number,
                                        animationJSON
                                    )[0]
                                }
                                onBlur={(e) => {
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
                            <input
                                min={0}
                                max={100}
                                type="number"
                                defaultValue={
                                    getLayerScale(
                                        selectedLayerId as number,
                                        animationJSON
                                    )[1]
                                }
                                onBlur={(e) => {
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
                            <input
                                min={0}
                                max={animationJSON.w}
                                type="number"
                                defaultValue={
                                    getLayerPosition(
                                        selectedLayerId as number,
                                        animationJSON
                                    )[0]
                                }
                                onBlur={(e) => {
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
                            <input
                                min={0}
                                max={animationJSON.h}
                                type="number"
                                defaultValue={
                                    getLayerPosition(
                                        selectedLayerId as number,
                                        animationJSON
                                    )[1]
                                }
                                onBlur={(e) => {
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
                            <input
                                min={0}
                                max={360}
                                type="number"
                                defaultValue={getLayerRotation(
                                    selectedLayerId as number,
                                    animationJSON
                                )}
                                onBlur={(e) => {
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
                            changeColor(
                                color.layerIndex,
                                color.shapeIndex,
                                color.itemType,
                                color.itemIndex,
                                newColor.hex,
                                animationJSON
                            );
                        }}
                    />
                </PickerContainer>
            ) : null}
        </Container>
    );
};

const UniqueColorPreviewPicker = ({ color }: { color: string }) => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [pickerColor, setPickerColor] = useState("#ffffff");

    const colorRgba = [
        hexRgb(color).red,
        hexRgb(color).green,
        hexRgb(color).blue,
        hexRgb(color).alpha,
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
                            changeAllColor(color, newColor.hex, animationJSON);
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
