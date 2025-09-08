import { Button } from "@mui/material";
import React from "react";
import { JSX } from "react";
import { IconRefresh } from "@tabler/icons-react";

interface RollAgainButtonProps {
    onClick: () => void;
}
const RollAgainButton = ({ onClick }: RollAgainButtonProps): JSX.Element => {
    return (
        <Button variant="contained" onClick={() => onClick()} sx={{ backgroundColor: (theme) => theme.palette.primary.main , mt: 2 }}>
            <IconRefresh size={16} style={{ marginRight: '4px' }} /> Roll Again
        </Button>
    );
};

export default RollAgainButton;