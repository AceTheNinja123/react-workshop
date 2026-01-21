import React from "react";
import { Box } from "@mui/material";
import AvatarGeneratorFunction from "@/app/_componets/dashboardComponets/avatarGenerator/AvatarGenerator";
const AvatarGenerator = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <AvatarGeneratorFunction/>
        </Box >
    );
};

export default AvatarGenerator;