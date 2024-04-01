import { fabric } from "fabric";
import { FC, useEffect } from "react";
import { useEditorStore } from "../store";

export const Canvas: FC = () => {
    const width = useEditorStore((state) => state.width);
    const height = useEditorStore((state) => state.height);
    const frames = useEditorStore((state) => state.frames);
    const duration = useEditorStore((state) => state.duration);

    useEffect(() => {
        if (frames.length !== 0) {
            const canvas = new fabric.Canvas("animation-canvas", {
                height: height,
                width: width,
                selection: true,
            });

            console.log(frames);

            let currentFrameIndex = 0;
            const animateFrames = () => {
                const frame = frames[currentFrameIndex];

                fabric.Image.fromURL(frame, (img) => {
                    img.scaleToHeight(height);
                    img.scaleToWidth(width);
                    canvas.clear();
                    canvas.add(img);
                    canvas.centerObject(img);
                    canvas.renderAll();
                });

                currentFrameIndex = (currentFrameIndex + 1) % frames.length;

                requestAnimationFrame(animateFrames);
            };

            animateFrames();
        }
    }, [frames, height, width, duration]);

    return (
        <>
            <canvas id="animation-canvas" />
        </>
    );
};
