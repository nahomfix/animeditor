import { Stack, Typography } from "@mui/material";
import { getColors, replaceColor } from "lottie-colorify";
import { FC, useState } from "react";
import { ChromePicker } from "react-color";
import rgbHex from "rgb-hex";
import styled from "styled-components";
import { useEditorStore } from "../store";

const removeDuplicateColors = (colors = []) => {
    const cleanColors = new Set(colors.map((color) => JSON.stringify(color)));
    const cleanArr = Array.from(cleanColors).map((color) => JSON.parse(color));
    return cleanArr;
};

export const PropertyInformation: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const availableColors = removeDuplicateColors(getColors(animationJSON));

    return (
        <Stack p={2} spacing={1}>
            <Typography variant="subtitle2">Global Colors</Typography>
            <Stack position="relative" spacing={1}>
                {availableColors.map((color: number[], index: number) => (
                    <ColorPreviewPicker key={index} color={color} />
                ))}
            </Stack>
        </Stack>
    );
};

const ColorPreviewPicker = ({ color }: { color: number[] }) => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const setAnimationJSON = useEditorStore((state) => state.setAnimationJSON);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [pickerColor, setPickerColor] = useState("#ffffff");

    return (
        <Container>
            <ColorPreview
                color={rgbHex(color[0], color[1], color[2])}
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

                            const updatedJSON = replaceColor(
                                color,
                                [
                                    newColor.rgb.r,
                                    newColor.rgb.g,
                                    newColor.rgb.b,
                                ],
                                animationJSON
                            );
                            setAnimationJSON(updatedJSON);
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
    width: 100%;
`;
