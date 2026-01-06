import React from "react";
import { Box } from "@mui/material";
import EDMFunction from "@/app/_componets/dashboardComponets/emplayeeDatabaseManagement/EmplayeeDatabaseManagement";
const EmplayeeDatabaseManagement = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <EDMFunction/>
        </Box >
    );
};

export default EmplayeeDatabaseManagement;