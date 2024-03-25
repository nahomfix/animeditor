import { Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { FC, SyntheticEvent, useState } from "react";
import { AnimationInformation } from "./AnimationInformation";
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
                backgroundColor: "#f8f0fb",
            }}
            px={1}
            py={2}
        >
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Information" sx={{ textTransform: "none" }} />
                <Tab label="Properties" sx={{ textTransform: "none" }} />
            </Tabs>
            {value === 0 && <AnimationInformation />}
            {value === 1 && <PropertyInformation />}
        </Stack>
    );
};
