import { Button, Stack } from "@mui/material";
import { FC } from "react";

export const Navbar: FC = () => {
    return (
        <Stack
            sx={{
                backgroundColor: "#191716",
                py: 2,
                px: 4,
            }}
            alignItems="flex-end"
        >
            <Button variant="contained">Export</Button>
        </Stack>
    );
};
