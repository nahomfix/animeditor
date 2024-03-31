import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import styled from "styled-components";
import { useEditorStore } from "../store";
import { Layer } from "../types";

export const LayersPanel: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const selectedLayerId = useEditorStore((state) => state.selectedLayerId);
    const setSelectedLayerId = useEditorStore(
        (state) => state.setSelectedLayerId
    );

    // const handleOnDragEnd = (result: any) => {
    //     reorderLayers(
    //         animationJSON as Animation,
    //         result.destination.index,
    //         result.source.index
    //     );
    // };

    // const items = {
    //     root: {
    //         index: "root",
    //         canMove: true,
    //         isFolder: true,
    //         children: ["child1", "child2"],
    //         data: "Root item",
    //         canRename: true,
    //     },
    //     child1: {
    //         index: "child1",
    //         canMove: true,
    //         isFolder: false,
    //         children: [],
    //         data: "Child item 1",
    //         canRename: true,
    //     },
    //     child2: {
    //         index: "child2",
    //         canMove: true,
    //         isFolder: true,
    //         children: ["child3"],
    //         data: "Child item 2",
    //         canRename: true,
    //     },
    //     child3: {
    //         index: "child3",
    //         children: [],
    //         data: "Child item 3",
    //     },
    // };

    // const dataProvider = useMemo(
    //     () =>
    //         new StaticTreeDataProvider(items, (item, data) => ({
    //             ...item,
    //             data,
    //         })),
    //     [items]
    // );

    const layers = {
        name: "",
        children: animationJSON.layers?.map((layer: Layer) => ({
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
            px={1}
            py={2}
        >
            <Typography variant="subtitle2">Layers</Typography>
            {/* <UncontrolledTreeEnvironment
                dataProvider={dataProvider}
                getItemTitle={(item) => item.data}
                viewState={{}}
                canDragAndDrop
                canDropOnFolder
                canReorderItems
                disableMultiselect
            >
                <Tree treeId="layers" rootItem="root" />
            </UncontrolledTreeEnvironment> */}
            <Tree
                data={data}
                nodeRenderer={({
                    element,
                    getNodeProps,
                    level,
                    handleSelect,
                }) => (
                    <Branch
                        {...getNodeProps()}
                        onClick={() => setSelectedLayerId(Number(element.id))}
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
`;
