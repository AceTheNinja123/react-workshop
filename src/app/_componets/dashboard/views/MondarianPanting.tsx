import React from "react";
import { Box } from "@mui/material";
import MondrianPaintingFunction from "@/app/_componets/mondrianPainting/MondrianPainting";


const MondrianPainting = () => {
        return (
                <Box sx={{ display: 'flex', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
                        <MondrianPaintingFunction />
                </Box>
        );
};

export default MondrianPainting;