import MondrianPaintingFunction from "@/app/_componets/dashboardComponets/mondrianPainting/MondrianPainting";
import React from "react";
import { Box } from "@mui/material";
const MondrianPainting = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
            <MondrianPaintingFunction/>
        </Box>
    );
}
export default MondrianPainting; 