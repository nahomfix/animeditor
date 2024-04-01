import { Stack } from "@mui/material";
import { FC, ReactNode } from "react";
import { LayersPanel } from "./LayersPanel";
import { Navbar } from "./Navbar";
import { PropertiesPanel } from "./PropertiesPanel";
import { TimelineEditor } from "./TimelineEditor";

interface LayoutProps {
    children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <Stack minHeight="100vh">
            <Navbar />
            <Stack flex={1} direction="row">
                <LayersPanel />
                <Stack alignItems="stretch" flex={1}>
                    <Stack flex={1}>{children}</Stack>
                    <TimelineEditor />
                </Stack>
                <PropertiesPanel />
            </Stack>
            {/* <Canvas /> */}
        </Stack>
    );
};
