//RecipeFinder
import RecipeFinderFunction from "@/app/_componets/dashboardComponets/recipeFinder/RecipeFinder";
import React from "react";
import { Box } from "@mui/material";
const RecipeFinder = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
            <RecipeFinderFunction/>
        </Box>
    );
}
export default RecipeFinder; 