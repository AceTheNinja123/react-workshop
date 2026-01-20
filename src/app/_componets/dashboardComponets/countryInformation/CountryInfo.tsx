/**
 * CountryInfo Component
 *
 * This component displays detailed information about a single country.
 * It receives country data as props and renders various details such as
 * flag, capital, continent, population, currency, languages, borders, area,
 * calling code, capital coordinates, and timezones.
 *
 * Features:
 * - Displays country flag using `next/image`.
 * - Presents key country facts in a structured format.
 * - Handles cases where certain data (e.g., borders) might be missing.
 * - Uses Material-UI for styling and layout.
 *
 * Dependencies:
 * - React: For building the user interface.
 * - next/image: For optimized image rendering.
 * - @mui/material: For UI components like Box, Typography, and styled utility.
 *
 * Usage:
 * This component is typically used within the `CountryInformation` component
 * to render the details of a fetched country.
 *
 * Example:
 * ```jsx
 * <CountryInfo countryData={myCountryData} />
 * ```
 *
 * @component
 * @param {Object} props - The component props.
 * @param {info} props.countryData - The country data object to display.
 * @returns {JSX.Element} The CountryInfo component.
 */

import React from 'react';
import Image from 'next/image';
import { Box, Typography, styled } from "@mui/material";

// Styles
const HeadingStyle = styled(Typography)({ margin: 0, fontSize: "15px", });
const DataRowBox = styled(Box)({ display: "flex", justifyContent: "space-between", });
const SpanBox = styled(Box)({ display: "block", marginBottom: 10, fontSize: 13, maxWidth: 300, });
// Types
interface info {
    name: { common: string };
    flags: { svg: string };
    capital: string[];
    continents: string[];
    population: number;
    currencies: { [key: string]: { name: string; symbol: string } };
    languages: { [key: string]: string };
    borders?: string[];
    area: number;
    idd: { root: string; suffixes: string[] };
    capitalInfo: { latlng: number[] };
    timezones: string[];
}
interface CountryInfoProps {
    countryData: info;
}

function CountryInfo({ countryData }: CountryInfoProps) {
    return (
        <Box sx={{ margin: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Image src={countryData.flags.svg} alt="Flag" width={298} height={200} style={{ marginTop: "10px", border: "1px solid #ced4da" }} />
                    <HeadingStyle variant="h4" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>{countryData.name.common}</HeadingStyle>
                </Box>
                {/* Capital */}
                <DataRowBox>
                    <HeadingStyle variant="h4">Capital:</HeadingStyle>
                    <SpanBox>{countryData.capital[0]}</SpanBox>
                </DataRowBox>
                {/* Continent */}
                <DataRowBox>
                    <HeadingStyle variant="h4">Continent:</HeadingStyle>
                    <SpanBox>{countryData.continents[0]}</SpanBox>
                </DataRowBox>
                {/* Population */}
                <DataRowBox>
                    <HeadingStyle variant="h4">Population:</HeadingStyle>
                    <SpanBox>{countryData.population}</SpanBox>
                </DataRowBox>
                {/* Currency */}
                <DataRowBox>
                    <HeadingStyle variant="h4">Currency:</HeadingStyle>
                    <SpanBox>{countryData.currencies[Object.keys(countryData.currencies)[0]].name}{' '} - {Object.keys(countryData.currencies)[0]}</SpanBox>
                </DataRowBox>
                {/* Common Languages */}
                <DataRowBox>
                    <HeadingStyle variant="h4">Common Languages:</HeadingStyle>
                    <SpanBox>{Object.values(countryData.languages).toString().split(',').join(', ')}</SpanBox>
                </DataRowBox>
                {/* Borders */}
                <DataRowBox>
                    <HeadingStyle variant="h4">Borders:</HeadingStyle>
                    <SpanBox>{(countryData.borders) ? Object.values(countryData.borders).toString().split(',').join(', ') : "NAN"}</SpanBox>
                </DataRowBox>
                {/* Area */}
                <DataRowBox>
                    <HeadingStyle variant="h4">Area:</HeadingStyle>
                    <SpanBox>{countryData.area}</SpanBox>
                </DataRowBox>
                {/* Calling Code */}
                <DataRowBox>
                    <HeadingStyle variant="h4">Calling Are:</HeadingStyle>
                    <SpanBox>{countryData.idd.root}{countryData.idd.suffixes[0]}</SpanBox>
                </DataRowBox>
                {/* Capital Latitudes and Longitudes */}
                <DataRowBox>
                    <HeadingStyle variant="h4">Capital Latitudes and Longitudes are:</HeadingStyle>
                    <SpanBox>{countryData.capitalInfo.latlng[0]} {countryData.capitalInfo.latlng[1]}</SpanBox>
                </DataRowBox>
                {/* TimeZones */}
                <DataRowBox>
                    <HeadingStyle variant="h4">TimeZones:</HeadingStyle>
                    <SpanBox>{Object.values(countryData.timezones).toString().split(',').join(', ')}</SpanBox>
                </DataRowBox>
        </Box>
    );
}
export default CountryInfo;