import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import styled from "styled-components";
import { LAYER_TYPE } from "../constants/layers";
import { useEditorStore } from "../store";
import { Layer } from "../types";
import {
    extractLayerColors,
    extractUniqueLayerColors,
    getLayerOpacity,
    getLayerPosition,
    getLayerRotation,
    getLayerScale,
} from "../utils/editor";

export const LayersPanel: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const selectedLayerId = useEditorStore((state) => state.selectedLayerId);
    const setSelectedLayerId = useEditorStore(
        (state) => state.setSelectedLayerId
    );
    const setOpacity = useEditorStore((state) => state.setOpacity);
    const setRotation = useEditorStore((state) => state.setRotation);
    const setPosition = useEditorStore((state) => state.setPosition);
    const setScale = useEditorStore((state) => state.setScale);
    const setColors = useEditorStore((state) => state.setColors);
    const setUniqueColors = useEditorStore((state) => state.setUniqueColors);

    const layers = {
        name: "",
        children: animationJSON.layers
            ?.filter((layer: Layer) => layer.ty === LAYER_TYPE.SHAPE)
            ?.map((layer: Layer) => ({
                id: layer.ind,
                name: layer.nm,
            })),
    };

    const data = flattenTree(layers);

    return (
        <Stack
            width={240}
            sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                borderRight: "1px solid #f3f6f8",
            }}
            spacing={2}
            px={2}
            py={3}
        >
            <Typography variant="subtitle2">Layers</Typography>
            <Tree
                data={data}
                nodeRenderer={({ element, getNodeProps }) => (
                    <Branch
                        {...getNodeProps()}
                        onClick={() => {
                            setSelectedLayerId(Number(element.id));
                            setColors(
                                extractLayerColors(
                                    Number(element.id),
                                    animationJSON
                                )
                            );
                            setUniqueColors(
                                extractUniqueLayerColors(
                                    Number(element.id),
                                    animationJSON
                                )
                            );
                            setOpacity(
                                getLayerOpacity(
                                    Number(element.id),
                                    animationJSON
                                )
                            );
                            setRotation(
                                getLayerRotation(
                                    Number(element.id),
                                    animationJSON
                                )
                            );
                            setScale(
                                getLayerScale(Number(element.id), animationJSON)
                            );
                            setPosition(
                                getLayerPosition(
                                    Number(element.id),
                                    animationJSON
                                )
                            );
                        }}
                        selected={element.id === selectedLayerId}
                    >
                        {element.name}
                    </Branch>
                )}
            />
        </Stack>
    );
};

const Tree = styled(TreeView)`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const Branch = styled.div<{ selected: boolean }>`
    background-color: ${({ selected }) =>
        selected ? "#f3f6f8" : "transparent"};
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
`;
