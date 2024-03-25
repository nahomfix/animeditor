import XXH from "xxhashjs";
import { useEditorStore } from "../store";
import { Animation, Layer } from "../types";

// global state setters
const setAnimationJSON = useEditorStore.getState().setAnimationJSON;
const setLayers = useEditorStore.getState().setLayers;

export const getFrameRate = (animationData: Animation) => {
    return animationData?.fr;
};

export const getFirstFrame = (animationData: Animation) => {
    return animationData?.ip;
};

export const getLastFrame = (animationData: Animation) => {
    return animationData?.op;
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

export const extractColors = (
    layers: any,
    rootLayersName: any,
    assetsIndex = null
) => {
    let colors: any[] = [];

    layers.forEach((v: any, i: any) => {
        if ("layers" in v) {
            //layer embededded in layer
            //todo
        } else if ("shapes" in v) {
            let shapes = extractColors(
                v.shapes,
                rootLayersName,
                assetsIndex
            ).map((val) => {
                val.layerId = rootLayersName + ":" + i + ":" + assetsIndex;
                val.layerName = v.nm;
                return val;
            });
            colors = colors.concat(shapes);
        } else if ("it" in v) {
            let items = findItemPath(v.it).map((val) => {
                val.shapeId = i;
                val.shapeName = v.nm;

                return val;
            });
            colors = colors.concat(items);
        }
    });

    return colors;
};

export const parseColors = (jsn: any, file = false) => {
    let parsed = file ? jsn : JSON.parse(jsn);

    let layers: any = {};

    extractColors(parsed.layers, "main").forEach((colorObj, i) => {
        let color = colorObj.keyFramed
            ? colorObj.color[colorObj.color.length - 1].start.join() +
              colorObj.color[colorObj.color.length - 1].end.join()
            : colorObj.color.join();
        let rootItemName = colorObj.itemName.split("->")[0].trim();
        let key = generateNewKeyHash(rootItemName + ":" + color);
        let layerId = colorObj.layerId.toString();

        if (layers.hasOwnProperty(layerId)) {
            if (key in layers[layerId]) {
                layers[layerId][key].push(colorObj);
            } else {
                layers[layerId][key] = [colorObj.shapeName, colorObj];
            }
        } else {
            layers[layerId] = {
                [key]: [colorObj.shapeName, colorObj],
                layerName: colorObj.layerName,
            };
        }
    });

    if (parsed.assets.length != 0) {
        parsed.assets.forEach((asset: any, i: any) => {
            if ("layers" in asset) {
                extractColors(asset.layers, "assets", i).forEach(
                    (colorObj, i) => {
                        let color = colorObj.keyFramed
                            ? colorObj.color[
                                  colorObj.color.length - 1
                              ].start.join() +
                              colorObj.color[
                                  colorObj.color.length - 1
                              ].end.join()
                            : colorObj.color.join();
                        let rootItemName = colorObj.itemName
                            .split("->")[0]
                            .trim();
                        let key = generateNewKeyHash(
                            rootItemName + ":" + color
                        );
                        let layerId = colorObj.layerId.toString();

                        if (layers.hasOwnProperty(layerId)) {
                            if (key in layers[layerId]) {
                                layers[layerId][key].push(colorObj);
                            } else {
                                layers[layerId][key] = [
                                    colorObj.shapeName,
                                    colorObj,
                                ];
                            }
                        } else {
                            layers[layerId] = {
                                [key]: [colorObj.shapeName, colorObj],
                                layerName: colorObj.layerName,
                            };
                        }
                    }
                );
            }
        });
    }

    return layers;
};

const findItemPath = (items: any[]) => {
    let path: any[] = [];

    items.forEach((item, i) => {
        if ("it" in item) {
            let items = findItemPath(item.it);

            if (items.length > 0) {
                items = items.map((colorObj) => {
                    colorObj.itemPath.push(i);
                    colorObj.itemName =
                        "nm" in item
                            ? item.nm + " -> " + colorObj.itemName
                            : "Item " + i + " -> " + colorObj.itemName;
                    return colorObj;
                });
            }

            path = path.concat(items);
        } else if (item.ty == "fl" || item.ty == "st") {
            //solid fill || stroke

            const itemName =
                "nm" in item
                    ? item.nm
                    : item.ty == "fl"
                    ? "Fill 1"
                    : "Stroke 1";
            if (item.c.a == 0) {
                const color = toRGBADecimal(item.c.k);
                path.push({
                    type: item.ty,
                    itemName: itemName,
                    itemPath: [i],
                    color: color,
                    keyFramed: false,
                });
            } else if (item.c.a == 1) {
                //color has keyframes
                let colors: any[] = [];
                item.c.k.forEach((v: any, i: any) => {
                    if ("s" in v) {
                        const startColor = toRGBADecimal(v.s);
                        //some json files don't have end color property, use 255 as a filler--not used for anything
                        //just allows the hash value to be start + end color
                        const endColor =
                            "e" in v ? toRGBADecimal(v.e) : [255, 255, 255, 0];
                        colors.push({
                            time: v.t,
                            start: startColor,
                            end: endColor,
                            index: i,
                        });
                    }
                });

                path.push({
                    type: item.ty,
                    itemName: itemName,
                    itemPath: [i],
                    color: colors,
                    keyFramed: true,
                });
            }
        } else if (item.ty == "gf" || item.ty == "gs") {
            //gradient fill/stroke
            const itemName =
                "nm" in item
                    ? item.nm
                    : item.ty == "gf"
                    ? "Gradient Fill 1"
                    : "Gradient Stroke 1";
            if (item.g.k.a == 0) {
                const color = toRGBADecimalGradient(item.g.k.k);
                path.push({
                    type: item.ty,
                    itemName: itemName,
                    itemPath: [i],
                    color: color,
                    keyFramed: false,
                });
            } else if (item.g.k.a == 1) {
                //gradient has keyframes
                let colors: any[] = [];
                item.g.k.k.forEach((v: any, i: any) => {
                    if ("s" in v && "e" in v) {
                        const startColor = toRGBADecimalGradient(v.s);
                        const endColor = toRGBADecimalGradient(v.e);
                        colors.push({
                            time: v.t,
                            start: startColor,
                            end: endColor,
                            index: i,
                        });
                    }
                });
                path.push({
                    type: item.ty,
                    itemName: itemName,
                    itemPath: [i],
                    keyFramed: true,
                    color: colors,
                });
            }
        }
    });

    return path;
};

const toRGBADecimal = (arr: any[]) =>
    arr.map((v, i) => (i != 3 && arr[3] != 0 ? Math.round(v * 255) : v));

const toRGBADecimalGradient = (arr: any[]) => {
    return arr.map((v, i) => {
        if (i != 0 && v % 4 == 0) {
            return v;
        } else {
            return Math.round(v * 255);
        }
    });
};

const generateNewKeyHash = (val: any) => {
    return XXH.h32(val, 0xabcd).toString(16);
};

export const loadAnimation = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const newAnimation = JSON.parse(event.target?.result as string);
        setAnimationJSON(newAnimation);
        setLayers(getLayers(newAnimation) as Layer[]);
    };
    reader.readAsText(file);
};

export const setColors = (animationJSON: any, newColorRgba: any[]) => {
    const modifiedJSON = {
        ...animationJSON,
    };

    console.log(modifiedJSON.layers[1]["shapes"][0]["it"]);
    modifiedJSON.layers[1]["shapes"][0]["it"][2]["c"]["k"] = newColorRgba;
    setAnimationJSON(modifiedJSON);
};
