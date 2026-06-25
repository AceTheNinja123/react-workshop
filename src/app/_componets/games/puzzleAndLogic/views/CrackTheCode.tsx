import CrackTheCodeFunction from "@/app/_componets/gamesComponets/crackTheCode/CrackTheCode";
import React from "react";
import { Box } from "@mui/material";
const CrackTheCode = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <CrackTheCodeFunction />
        </Box>
    );
}
export default CrackTheCode; 