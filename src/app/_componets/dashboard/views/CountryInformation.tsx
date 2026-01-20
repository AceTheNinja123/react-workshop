import React from "react";
import { Box } from "@mui/material";
import CountryInformationFunction from "@/app/_componets/dashboardComponets/countryInformation/CountryInformation";
const CountryInformation = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <CountryInformationFunction />
        </Box >
    );
};
export default CountryInformation;