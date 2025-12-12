import { Stack } from "@mui/material";
import "./App.css";
import { FilePicker, Layout, Viewer } from "./components";
import { useEditorStore } from "./store";

function App() {
    const animationJSON = useEditorStore((state) => state.animationJSON);

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
            {/* <Canvas /> */}
        </Layout>
    );
}

export default App;
