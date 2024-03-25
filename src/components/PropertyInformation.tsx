import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { ChromePicker } from "react-color";
import rgbHex from "rgb-hex";
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

                    setColors(animationJSON, Object.values(color.rgb));
                }}
            />
        </Stack>
    );
};
