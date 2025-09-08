"use client";
import dynamic from "next/dynamic";
import React, { useLayoutEffect, useEffect, useState, } from "react";
import { useTheme } from '@mui/material/styles';
import { Grid, ButtonGroup, Button, Box, Typography, Divider, CardContent, Stack, CircularProgress } from "@mui/material";
import BlankCard from "@/app/_componets/shared/BlankCard";
// import { fetchNationalitySelect } from '../../../../store/demographic/DemographicSlice';
//import { useDispatch, useSelector, datePickerDate, trendrange, yAxisType, diffDays, npstarget, location, SetLocation} from '@/state/store';
import { usePathname } from 'next/navigation'
import useStore, { type Store } from "@/state/store";
import { dataType, PolygonMapData } from "../mapData"
interface geometryType { "type": string; "coordinates": Array<Array<number>> }
interface dataContextType { "geometry": geometryType; "geometryType": string; "madeFromGeoData": boolean; "id": string; "name": string; }
//Amcharts
// const AmChartMapGroupColumnChart = dynamic(() => import("./MapGroupColumnChart"), { ssr: false });

export default function MapGroupColumnChart() {
    const link = useStore((state: Store) => state.link);

    const [NationalitySelectData, setNationalitySelectData] = useState([]);
    const [datesData, setDatesData] = useState([]);
    const [CountriesData, setCountriesData] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const anchorRef = React.useRef<HTMLDivElement>(null);
    //Set the path
    const pathname = usePathname();

    // useEffect(() => {
    //     dispatch(link.setHref(pathname));
    //     const toets = { "currentFilterSetId": "9730632", "countries": [], "viewby": trendrange };

    //     if (mapData && mapData.length > 0) {
    //         mapData.forEach(function (country) { toets["countries"].push((country.id)); });
    //         dispatch(fetchNationalitySelect(toets));
    //     }
    // }, [dispatch, trendrange, mapData]);

    // const GetNationalitySelect: NationalitySelect[] = useSelector((state: AppState) => state.demographicReducer.NationalitySelect);

    // useEffect(() => {
    //     if (GetNationalitySelect) { setNationalitySelectData(GetNationalitySelect); }
    //     if (NationalitySelectData.data) { setCountriesData(NationalitySelectData.data) }
    //     if (NationalitySelectData.dates) { setDatesData(NationalitySelectData.dates) }
    //     if (mapData !== undefined || datesData !== undefined) {
    //         const mergedData = Object.keys(mapData).map((key) => {
    //             let countryName;
    //             const ratings = mapData[key]['rating'];
    //             const numReviews = mapData[key]['num_reviews'];
    //             countriesData.forEach(function (country) { if (country.id == key) { countryName = country.name } });
    //             const mergedDataPoints = datesData.map((date, index) => ({ date, rating: ratings[index], num_reviews: numReviews[index] }));
    //             return { [countryName]: mergedDataPoints };
    //         });
    //         setData(mergedData);
    //         setLoading(false);
    //     }
    // }, [GetNationalitySelect, NationalitySelectData, countriesData, datesData]);

    return (
        <>
            <BlankCard>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                        {(PolygonMapData.length == 1) ? (<Typography variant="h1" mb={1}>{PolygonMapData[0].name}</Typography>) : (<Typography variant="h1" mb={1}>Comparing countries</Typography>)}
                    </Stack>
                    <Divider sx={{ border: 1, borderColor: "inherit", my: 1 }} flexItem />
                    <Typography variant="h6" mb={1}>Shift + Click on map to compare countries</Typography>
                    {loading ? (
                        <Box style={{ width: "100%", height: "500px" }} display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>
                    ) : (
                        <Typography variant="h3" mb={1} >No Data Found</Typography>
                        // data ? (<AmChartMapGroupColumnChart data={data} />) : (<Box alignItems="center"><Typography variant="h3" mb={1} >No Data Found</Typography></Box>)
                    )}
                </CardContent>
            </BlankCard>
        </>
    );
};