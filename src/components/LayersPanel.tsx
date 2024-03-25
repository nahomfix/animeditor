import { Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { FC } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEditorStore } from "../store";
import { Animation } from "../types";
import { reorderLayers } from "../utils/editor";

export const LayersPanel: FC = () => {
    const animationJSON = useEditorStore((state) => state.animationJSON);

    const handleOnDragEnd = (result: any) => {
        console.log(result);

        reorderLayers(
            animationJSON as Animation,
            result.destination.index,
            result.source.index
        );
    };

    return (
        <Stack
            width={240}
            sx={{
                backgroundColor: "#363230",
                color: "#fff",
            }}
            spacing={2}
            px={1}
            py={2}
        >
            <Typography variant="subtitle2">Layers</Typography>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="layers">
                    {(provided) => (
                        <Stack
                            spacing={1}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {animationJSON?.layers?.map(
                                (layer: any, index: number) => (
                                    <Draggable
                                        draggableId={`${layer.ind}`}
                                        key={`${layer.ind}`}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <Accordion
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <AccordionSummary>
                                                    {layer.nm}
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {layer.shapes?.map(
                                                        (shape: any) => (
                                                            <p key={shape.ind}>
                                                                {shape.nm}
                                                            </p>
                                                        )
                                                    )}
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                    </Draggable>
                                )
                            )}
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </Stack>
    );
};
