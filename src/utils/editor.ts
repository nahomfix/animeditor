import { saveAs } from "file-saver";
import hexRgb from "hex-rgb";
import { getColors, replaceColor } from "lottie-colorify";
import rgbHex from "rgb-hex";
import { LAYER_TYPE } from "../constants/layers";
import { useEditorStore } from "../store";
import { Animation, Layer } from "../types";
import { ParsedColor } from "../types/colors";

// global state setters
const setAnimationJSON = useEditorStore.getState().setAnimationJSON;
const setLayers = useEditorStore.getState().setLayers;
const setColors = useEditorStore.getState().setColors;
const setFrameRate = useEditorStore.getState().setFrameRate;
const setWidth = useEditorStore.getState().setWidth;
const setHeight = useEditorStore.getState().setHeight;
const setDuration = useEditorStore.getState().setDuration;

export const getBodymovinVersion = (animationData: Animation) => {
    return animationData.v || "";
};

export const getName = (animationData: Animation) => {
    return animationData.nm || "";
};

export const getFrameRate = (animationData: Animation) => {
    return Math.round(animationData?.fr) || 0;
};

export const getFirstFrame = (animationData: Animation) => {
    return Math.round(animationData?.ip) || 0;
};

export const getLastFrame = (animationData: Animation) => {
    return Math.round(animationData?.op) || 0;
};

export const getWidth = (animationData: Animation) => {
    return animationData.w || 0;
};

export const getHeight = (animationData: Animation) => {
    return animationData.h || 0;
};

export const getDuration = (animationData: Animation) => {
    const frameRate = Math.round(animationData?.fr) || 0;
    const totalFrames = getLastFrame(animationData);
    const duration = totalFrames / frameRate;
    return duration;
};

export const getLayers = (animationData: Animation) => {
    return animationData.layers;
};

export const reorderLayers = (
    animationData: Animation,
    destination: number,
    source: number
): void => {
    // Create a copy of the original layers array
    const originalLayers = [...(animationData.layers as Layer[])];

    const [removed] = originalLayers.splice(source, 1);
    originalLayers.splice(destination, 0, removed);
    animationData.layers = originalLayers;

    setAnimationJSON(animationData);
};

export const extractColors = (layers: any[]) => {
    const colors: ParsedColor[] = [];

    for (const layer of layers) {
        if (layer.ty === LAYER_TYPE.SHAPE) {
            for (const shape of layer.shapes) {
                if (shape.it) {
                    for (const item of shape.it) {
                        if (item.c) {
                            if (Array.isArray(item.c.k)) {
                                if (item.c.k.length === 4) {
                                    let rgba = item.c.k;
                                    let hex = rgbHex(
                                        rgba[0] * 255,
                                        rgba[1] * 255,
                                        rgba[2] * 255,
                                        rgba[3]
                                    );
                                    colors.push({
                                        color: hex,
                                        layerIndex: layer.ind,
                                        shapeIndex: shape.ix,
                                        itemIndex: item.ind,
                                        itemType: item.ty,
                                    });
                                } else if (item.c.k.length === 3) {
                                    let rgb = item.c.k;
                                    let hex = rgbHex(
                                        rgb[0] * 255,
                                        rgb[1] * 255,
                                        rgb[2] * 255
                                    );
                                    colors.push({
                                        color: hex,
                                        layerIndex: layer.ind,
                                        shapeIndex: shape.ix,
                                        itemIndex: item.ind,
                                        itemType: item.ty,
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }

        if (layer.layers) {
            extractColors(layer.layers);
        }
    }

    return colors;
};

const removeDuplicateColors = (colors = []) => {
    const cleanColors = new Set(colors.map((color) => JSON.stringify(color)));
    const cleanArr = Array.from(cleanColors).map((color) => JSON.parse(color));
    return cleanArr;
};

export const extractAllColors = (animationData: Animation) => {
    const colors: string[] = [];
    const allColors = getColors(animationData);
    const uniqueColors = removeDuplicateColors(allColors);
    for (const uniqueColor of uniqueColors) {
        colors.push(
            `#${rgbHex(uniqueColor[0], uniqueColor[1], uniqueColor[2])}`
        );
    }
    return colors;
};

export const loadAnimation = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const newAnimation = JSON.parse(event.target?.result as string);
        setAnimationJSON(newAnimation);
        setLayers(getLayers(newAnimation) as Layer[]);
        setFrameRate(getFrameRate(newAnimation));
        setWidth(getWidth(newAnimation));
        setHeight(getHeight(newAnimation));
        setDuration(getDuration(newAnimation));
        setColors(extractColors(getLayers(newAnimation) as Layer[]));
    };
    reader.readAsText(file);
};

export const getLayerOpacity = (layerId: number, animationJSON: Animation) => {
    const currentLayer = animationJSON.layers?.find(
        (layer) => layer.ind === layerId
    );

    console.log({ currentLayer });

    let opacity = 0;

    if (currentLayer?.ks?.o?.a === 0) {
        opacity = currentLayer?.ks?.o?.k as number;
    }

    return opacity;
};

export const getLayerScale = (layerId: number, animationJSON: Animation) => {
    const currentLayer = animationJSON.layers?.find(
        (layer) => layer.ind === layerId
    );

    let scale = [0, 0, 0];

    if (currentLayer?.ks?.s?.a === 0) {
        scale = currentLayer?.ks?.s?.k as number[];
    }

    return scale;
};

export const getLayerPosition = (layerId: number, animationJSON: Animation) => {
    const currentLayer = animationJSON.layers?.find(
        (layer) => layer.ind === layerId
    );

    let position = [0, 0, 0];

    if (currentLayer?.ks?.p?.a === 0) {
        position = currentLayer?.ks?.p?.k as number[];
    }

    return position;
};

export const getLayerRotation = (layerId: number, animationJSON: Animation) => {
    const currentLayer = animationJSON.layers?.find(
        (layer) => layer.ind === layerId
    );
    let rotation = 0;

    if (currentLayer?.ks?.r?.a === 0) {
        rotation = currentLayer?.ks?.r?.k as number;
    }

    return rotation;
};

export const changeFrameRate = (
    frameRate: number,
    animationJSON: Animation
) => {
    const currentAnimationJSON = {
        ...animationJSON,
    };
    currentAnimationJSON["fr"] = frameRate;
    setAnimationJSON(currentAnimationJSON);
    const totalFrames = getLastFrame(animationJSON);
    const newDuration = totalFrames / frameRate;
    console.log({ newDuration });
    setDuration(newDuration);
};

export const changeDuration = (duration: number, animationJSON: Animation) => {
    const totalFrames = getLastFrame(animationJSON);
    const newFrameRate = Math.round(totalFrames / duration);
    setFrameRate(newFrameRate);
    changeFrameRate(newFrameRate, animationJSON);
};

export const changeWidth = (width: number, animationJSON: Animation) => {
    const currentAnimationJSON = {
        ...animationJSON,
    };
    currentAnimationJSON["w"] = width;
    setAnimationJSON(currentAnimationJSON);
};

export const changeHeight = (height: number, animationJSON: Animation) => {
    const currentAnimationJSON = {
        ...animationJSON,
    };
    currentAnimationJSON["h"] = height;
    setAnimationJSON(currentAnimationJSON);
};

export const changeColor = (
    layerIndex: number,
    shapeIndex: number,
    itemType: string,
    itemIndex: number,
    color: string,
    animationJSON: Animation
) => {
    const currentAnimationJSON = {
        ...animationJSON,
    };
    const currentLayer = currentAnimationJSON.layers?.find(
        (layer) => layer.ind === layerIndex
    ) as any;
    const currentShape = currentLayer.shapes?.find(
        (shape: any) => shape.ix === shapeIndex
    );
    const currentItem = currentShape.it?.find(
        (item: any) => item.ty === itemType && item.ix === itemIndex
    );
    console.log({ currentItem });
    currentItem["c"]["k"] = [
        hexRgb(color).red / 255,
        hexRgb(color).green / 255,
        hexRgb(color).blue / 255,
        hexRgb(color).alpha,
    ];
    setAnimationJSON(currentAnimationJSON);
    setColors(extractColors(getLayers(currentAnimationJSON) as Layer[]));
};

export const changeAllColor = (
    currentColor: string,
    newColor: string,
    animationJSON: Animation
) => {
    const currentAnimationJSON = {
        ...animationJSON,
    };
    const updatedAnimationJSON = replaceColor(
        currentColor,
        newColor,
        currentAnimationJSON
    );
    setAnimationJSON(updatedAnimationJSON);
    setColors(extractColors(getLayers(updatedAnimationJSON) as Layer[]));
};

export const exportFile = () => {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Animation File</title>
    </head>
    <body>
        <canvas />
    </body>
    </html>
    `;

    const file = new File([htmlTemplate], "Export.html", {
        type: "text/html;charset=utf-8",
    });
    saveAs(file);
};
