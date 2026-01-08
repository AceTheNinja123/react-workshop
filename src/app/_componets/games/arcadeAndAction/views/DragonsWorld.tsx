import DragonsWorldFunction from "@/app/_componets/gamesComponets/dragonsWorld/DragonsWorld";
import React from "react";
import { Box } from "@mui/material";
const DragonsWorld = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <DragonsWorldFunction />
        </Box>
    );
}
export default DragonsWorld; 