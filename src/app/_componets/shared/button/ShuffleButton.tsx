import { Button } from "@mui/material";
import React from "react";
import { JSX } from "react";
import { IconRefresh } from "@tabler/icons-react";
interface ShuffleButtonProps {
    onClick: () => void;
}
const ShuffleButton = ({ onClick }: ShuffleButtonProps) : JSX.Element => {
    return (
        <Button variant="contained" onClick={onClick}>
            <IconRefresh size={16} style={{ marginRight: '4px' }} /> Shuffle
        </Button>
    );
};

export default ShuffleButton;