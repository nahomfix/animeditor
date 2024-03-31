import { fabric } from "fabric";
import { FC, useEffect } from "react";

export const TestCanvas: FC = () => {
    useEffect(() => {
        const fabricCanvas = new fabric.Canvas("test-canvas", {
            height: 800,
            width: 800,
            backgroundColor: "#eee",
        });

        fabricCanvas.renderAll();

        var rect = new fabric.Rect({
            fill: "#fA0",
            width: 100,
            height: 100,
            selectable: true,
        });

        var circle = new fabric.Circle({
            radius: 100,
            fill: "#fA0",
        });

        var group = new fabric.Group([rect, circle], {
            top: 200,
            left: 200,
        });

        fabricCanvas.add(group);

        rect.on("rotating", (e) => {
            console.log(e);
        });
    }, []);

    return (
        <>
            <canvas id="test-canvas" />
        </>
    );
};
