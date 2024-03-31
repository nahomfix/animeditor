import { Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { FC, SyntheticEvent, useState } from "react";
import { AnimationInformation } from "./AnimationInformation";
import { AnimationSettings } from "./AnimationSettings";
import { PropertyInformation } from "./PropertyInformation";

export const PropertiesPanel: FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Stack
            width={320}
            sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                borderLeft: "1px solid #f3f6f8",
            }}
            px={1}
            py={2}
            overflow="hidden"
        >
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Properties" sx={{ textTransform: "none" }} />
                <Tab label="Settings" sx={{ textTransform: "none" }} />
                <Tab label="Information" sx={{ textTransform: "none" }} />
            </Tabs>
            {value === 0 && <PropertyInformation />}
            {value === 1 && <AnimationSettings />}
            {value === 2 && <AnimationInformation />}
        </Stack>
    );
};
