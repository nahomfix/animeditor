import { Stack } from "@mui/material";
import "./App.css";
import { FilePicker, Layout, Viewer } from "./components";
import { useEditorStore } from "./store";

function App() {
    const animationJSON = useEditorStore((state) => state.animationJSON);
    const colors = useEditorStore((state) => state.colors);

    const layers = Object.keys(colors);

    console.log(layers);

    // useEffect(() => {
    //     let animation = Lottie.loadAnimation({
    //         container: document.getElementById("preview") as HTMLElement,
    //         renderer: "canvas",
    //         loop: true,
    //         autoplay: true,
    //         animationData: animationJSON,
    //     });

    //     // const canvas = document.querySelector("canvas");

    //     // canvas?.setAttribute("id", "canvas-lottie");

    //     const fabricCanvas = new fabric.Canvas("fabric-canvas", {
    //         height: 500,
    //         width: 500,
    //         backgroundColor: "red",
    //     });

    //     fabricCanvas.renderAll();

    //     fabricCanvas.on("mouse:over", (e) => {
    //         console.log(e);
    //     });

    //     fabricCanvas.loadFromJSON(animationJSON, () => {
    //         console.log(`Loaded JSON to Fabric`);
    //     });

    //     return () => animation.destroy();
    // });

    if (!animationJSON) {
        return (
            <Stack
                minHeight="100vh"
                alignItems="center"
                justifyContent="center"
            >
                <FilePicker />
            </Stack>
        );
    }

    return (
        <Layout>
            <Viewer />
            {/* <div id="preview"></div> */}

            {/* <canvas id="fabric-canvas" /> */}
        </Layout>
    );
}

export default App;
