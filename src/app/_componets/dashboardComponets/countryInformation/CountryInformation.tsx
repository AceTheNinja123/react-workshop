/**
 * CountryInformation Component
 *
 * This component provides an interface for searching and displaying information about countries.
 * Users can enter a country name, and the component fetches data from the Restcountries API
 * to show details such as capital, continent, population, currency, languages, borders, area,
 * calling code, capital coordinates, and timezones.
 *
 * Features:
 * - Input field for country name search.
 * - Displays detailed country information using the `CountryInfo` sub-component.
 * - Handles loading and error states, providing user feedback.
 * - Uses Material-UI for styling and layout.
 * - Integrates `ScrollbarComponents` for scrollable content within the display area.
 *
 * Dependencies:
 * - React: For building the user interface and managing state.
 * - @mui/material: For UI components like Box, Typography, Button, TextField, and styled utility.
 * - ../../../_componets/custom-scroll/ScrollbarComponents: Custom scrollbar component.
 * - ./CountryInfo: Component to display individual country details.
 *
 * Usage:
 * This component can be integrated into a larger application, typically within a dashboard or an information section.
 *
 * Example:
 * ```jsx
 * <CountryInformation />
 * ```
 *This inspiration was taken from Country Information React Application: https://www.geeksforgeeks.org/reactjs/react-application-that-provides-country-information/
 * 
 * @component
 * @returns {JSX.Element} The CountryInformation component.
 */
import React, { useState } from 'react';
import { Box, Typography, Button, styled, TextField, useTheme } from "@mui/material";
import CountryInfo from './CountryInfo';
import ScrollbarComponents from "@/app/_componets/custom-scroll/ScrollbarComponents";

const SearchButton = styled(Button)({
    padding: "5px 15px",
    outline: "none",
    border: "2px solid",
    width: "100px",
    margin: "5px",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "16px",
    transition: "all 0.5s",
});
const CountryInformation = () => {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState(null);
    const [error, setError] = useState('');
    const theme = useTheme();
    const handleSearch = () => {
        if (!countryName) {
            setError('The input field cannot be empty');
            setCountryData(null);
            return;
        }

        const finalURL = `https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`;
        fetch(finalURL)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Not Found") {
                    setError("Country Information is not Found");
                    setCountryData(null);
                } else if (data.length === 0) {
                    setError('Please enter a valid country name.');
                    setCountryData(null);
                } else {
                    setError('');
                    setCountryData(data[0]);
                }
            })
            .catch(() => {
                setError('An error occurred while fetching data.');
                setCountryData(null);
            });
    };
    return (
        <Box
            sx={{
                maxWidth: 650,
                width: "100%",
                height: 700,
                display: "flex",
                flexDirection: "column",
                border: "3px solid",
                borderRadius: 3,
                backgroundColor: theme.palette.primary.light,
                borderColor: theme.palette.primary.main,
            }}
        >
            {/* Header (no scroll) */}
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    borderBottom: "1px solid",
                    borderColor: "primary.main",
                }}
            >
                <TextField placeholder="Enter a country name..." value={countryName} onChange={(e) => setCountryName(e.target.value)} sx={{ width: 300 }} />
                <SearchButton onClick={handleSearch}>Search</SearchButton>
            </Box>

            {/* Scrollable content */}
            <ScrollbarComponents sx={{height: "100%", padding: 2,}}>
                {error && <Typography color="error">{error}</Typography>}
                {countryData && <CountryInfo countryData={countryData} />}
            </ScrollbarComponents>
        </Box>
    );
}
export default CountryInformation;