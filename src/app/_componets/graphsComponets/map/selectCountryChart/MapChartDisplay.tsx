"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, CardContent, Stack } from "@mui/material";
import BlankCard from "@/app/_componets/shared/BlankCard";
import { dataType } from "../PolygonMapData"
interface dataContextType {
    id: string; name: string; value: number; population: number;
    tourists: number;
    safety: number;
}
//Amcharts
import AmChartMapGroupColumnChart from "./MapGroupColumnChart";
export default function MapGroupColumnChart({ countries }: { countries: dataType[] }) {
    const [data, setData] = useState<dataContextType[] | null>(null);
    useEffect(() => {
        const countriesData: { id: string; name: string; value: number; population: number; tourists: number; safety: number; }[] = [];
        if (countries && countries.length > 0) {
            countries.forEach(function (country) { countriesData.push({ id: country.id, name: country.name, value: country.value, population: country.population, tourists: country.tourists, safety: country.safety }); });
            setData(countriesData);
        }
    }, [countries]);

    return (
        <>
            <BlankCard>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                        {(countries.length == 1) ? (<Typography variant="h1" mb={1}>{countries[0].name}</Typography>) : (<Typography variant="h1" mb={1}>Comparing countries</Typography>)}
                    </Stack>
                    <Divider sx={{ border: 1, borderColor: "inherit", my: 1 }} flexItem />
                    <Typography variant="h6" mb={1}>Shift + Click on map to compare countries</Typography>

                    {data !== null && data.length > 0 ? (<AmChartMapGroupColumnChart props={data} />) : (<Box alignItems="center"><Typography variant="h3" mb={1} >No Data Found</Typography></Box>)}
                </CardContent>
            </BlankCard>
        </>
    );
};