import { fabric } from "fabric";
import { FC, useEffect } from "react";
import { useEditorStore } from "../store";

export const Canvas: FC = () => {
    const width = useEditorStore((state) => state.width);
    const height = useEditorStore((state) => state.height);
    const layerFrames = useEditorStore((state) => state.layerFrames);
    const duration = useEditorStore((state) => state.duration);

    useEffect(() => {
        if (layerFrames.length !== 0) {
            const canvas = new fabric.Canvas("animation-canvas", {
                width: 800,
                height: 500,
                selection: true,
            });

            console.log(layerFrames);

            let currentFrameIndex = 0;
            const animateFrames = () => {
                for (const layerFrame of layerFrames) {
                    const frame = layerFrame[currentFrameIndex];

                    fabric.Image.fromURL(frame, (img) => {
                        // img.scaleToHeight(height);
                        // img.scaleToWidth(width);
                        img.scale(0.5);
                        // canvas.clear();
                        canvas.add(img);
                        canvas.centerObject(img);
                    });

                    canvas.renderAll();
                    // currentFrameIndex =
                    //     (currentFrameIndex + 1) % layerFrame.length;

                    // requestAnimationFrame(animateFrames);
                }
            };

            animateFrames();
        }
    }, [height, width, duration, layerFrames]);

    return (
        <>
            <canvas id="animation-canvas" width={width} height={height} />
        </>
    );
};
