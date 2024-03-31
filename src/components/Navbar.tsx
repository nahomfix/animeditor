import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { exportFile } from "../utils/editor";

export const Navbar: FC = () => {
    return (
        <Stack
            sx={{
                backgroundColor: "#ffffff",
                py: 2,
                px: 4,
                borderBottom: "1px solid #f3f6f8",
            }}
            alignItems="flex-end"
        >
            <Button variant="contained" onClick={exportFile}>
                Export
            </Button>
        </Stack>
    );
};
