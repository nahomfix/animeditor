import { Stack, Typography } from "@mui/material";
import { getColors } from "lottie-colorify";
import { FC, useState } from "react";
import { ChromePicker } from "react-color";
import rgbHex from "rgb-hex";
import styled from "styled-components";
import { useEditorStore } from "../store";
import { setColors } from "../utils/editor";

export const PropertyInformation: FC = () => {
    const [color, setColor] = useState("#fff");
    const animationJSON = useEditorStore((state) => state.animationJSON);

    return (
        <Stack p={2} spacing={1}>
            <Typography variant="subtitle2">Color</Typography>
            <ChromePicker
                color={color}
                onChange={(color) => {
                    setColor(
                        "#" +
                            rgbHex(
                                color.rgb.r,
                                color.rgb.g,
                                color.rgb.b,
                                color.rgb.a
                            )
                    );

                    const rgbaColor = Object.values(color.rgb);
                    const rgbColor = [
                        rgbaColor[0] / 255,
                        rgbaColor[1] / 255,
                        rgbaColor[2] / 255,
                    ];
                    setColors(animationJSON, rgbColor);
                }}
            />
            <Typography variant="subtitle2">Parsed Colors</Typography>
            <Stack position="relative" spacing={1}>
                {getColors(animationJSON).map(
                    (color: number[], index: number) => (
                        <ColorPreview
                            key={index}
                            color={rgbHex(color[0], color[1], color[2])}
                        />
                    )
                )}
            </Stack>
        </Stack>
    );
};

const ColorPreview = styled.div<{ color: string }>`
    background-color: ${({ color }) => (color ? `#${color}` : "inherit")};
    height: 20px;
    width: 100%;
`;
