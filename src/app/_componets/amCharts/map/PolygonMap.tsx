"use client";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import dynamic from "next/dynamic";
//Amcharts
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
//Charts
// const AmChartMapChartDisplay = dynamic(() => import("./selectCountryChart/MapChartDisplay"), { ssr: false });
import { dataType, PolygonMapData } from "./PolygonMapData"
interface geometryType { "type": string; "coordinates": Array<Array<number>> }
interface dataContextType { "geometry": geometryType; "geometryType": string; "madeFromGeoData": boolean; "id": string; "name": string; }
export default function PolygonMapChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const selectedCountries = new Set<am5map.MapPolygon>();
    const [highestCountry, setHighestCountry] = useState();
    const [countriesData, setCountriesData] = useState<dataType[]>([]);


    useLayoutEffect(() => {
        let highestNum = 0;
        let previousPolygon: am5map.MapPolygon | undefined;
        const Title = "Total Response by Country";
        const polygonRoot = am5.Root.new("polygonMapChart");
        //let colors = am5.ColorSet.new(polygonRoot, {colors:['#F9BC3F', '#8ED395', '#6ACDBB', '#A985D6', '#47C25E', '#40A4BF', '#28956D', '#225981', '#9BD45E', '#2A9D94', '#DF5A46', '#51BBC9', '#CB5034', '#28C89E', '#672644', '#308F90', '#19A4BD', '#87D8DC', '#F0C45F', '#E7804C'],});
        const colors = am5.ColorSet.new(polygonRoot, {});
        const tooltipHTML = '<center><strong>{name}</strong></center><table><tr><td style="padding:0">Total Responses: </td><td style="padding:0;"><b> {value}</b></td></tr><tr><td style="padding:0">Review Rating: </td><td><b>{review_rating} %</b></td></tr><tr><td style="padding:0">Sentiment: </td><td style="padding:0;"><b>{sentiment}</b></td></tr><tr><td style="padding:0">Net Promoter Score: </td><td style="padding:0"><b>{nps}</b></td></tr></table>'

        //set color for the countys
        for (let i = 0; i < PolygonMapData.length; i++) {
            if (PolygonMapData[i].value < 3) {
                PolygonMapData[i].polygonSettings = { disabled: false, active: false, tooltipHTML: tooltipHTML, toggleKey: "active", interactive: true, fill: colors.getIndex(0) };
                PolygonMapData[i].countyValueGroup = "< 3";
            } else if (PolygonMapData[i].value >= 3 && PolygonMapData[i].value <= 10) {
                PolygonMapData[i].polygonSettings = { disabled: false, active: false, tooltipHTML: tooltipHTML, toggleKey: "active", interactive: true, fill: colors.getIndex(1) };
                PolygonMapData[i].countyValueGroup = "3 - 10";
            } else if (PolygonMapData[i].value > 10 && PolygonMapData[i].value <= 25) {
                PolygonMapData[i].polygonSettings = { disabled: false, active: false, tooltipHTML: tooltipHTML, toggleKey: "active", interactive: true, fill: colors.getIndex(2) };
                PolygonMapData[i].countyValueGroup = "10 - 25";
            } else if (PolygonMapData[i].value > 25 && PolygonMapData[i].value <= 50) {
                PolygonMapData[i].polygonSettings = { disabled: false, active: false, tooltipHTML: tooltipHTML, toggleKey: "active", interactive: true, fill: colors.getIndex(3) };
                PolygonMapData[i].countyValueGroup = "25 - 50";
            } else if (PolygonMapData[i].value > 50 && PolygonMapData[i].value <= 100) {
                PolygonMapData[i].polygonSettings = { disabled: false, active: false, tooltipHTML: tooltipHTML, toggleKey: "active", interactive: true, fill: colors.getIndex(4) };
                PolygonMapData[i].countyValueGroup = "50 - 100";
            } else if (PolygonMapData[i].value > 100 && PolygonMapData[i].value <= 300) {
                PolygonMapData[i].polygonSettings = { disabled: false, active: false, tooltipHTML: tooltipHTML, toggleKey: "active", interactive: true, fill: colors.getIndex(5) };
                PolygonMapData[i].countyValueGroup = "100 - 300";
            } else if (PolygonMapData[i].value > 300) {
                PolygonMapData[i].polygonSettings = { disabled: false, active: false, tooltipHTML: tooltipHTML, toggleKey: "active", interactive: true, fill: colors.getIndex(6) };
                PolygonMapData[i].countyValueGroup = "> 300";
            }
            if (highestNum < PolygonMapData[i].value) { highestNum = PolygonMapData[i].value; }
        }

        // Set themes
        polygonRoot.setThemes([am5themes_Animated.new(polygonRoot)]);

        // Create the map chart
        const chart = polygonRoot.container.children.push(am5map.MapChart.new(polygonRoot, { panX: "rotateX", panY: "rotateY", projection: am5map.geoMercator(), exportable: true, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }));

        const title = chart.children.unshift(am5.Label.new(polygonRoot, { text: Title, fontSize: 20, centerY: 30, textAlign: "center", width: am5.p100, paddingBottom: 50, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Polygon Map chart that display " + Title);

        // Create series for background fill
        const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(polygonRoot, {}));
        backgroundSeries.mapPolygons.template.setAll({ fill: polygonRoot.interfaceColors.get("secondaryButton"), fillOpacity: 0, strokeOpacity: 0 });
        backgroundSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

        // Create main polygon series for countries
        const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(polygonRoot, { geoJSON: am5geodata_worldLow, }));

        //Polygon Series Settings
        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{tooltipHTML}",
            fill: polygonRoot.interfaceColors.get("secondaryButton") ? polygonRoot.interfaceColors.get("secondaryButton") : am5.color(0xffffff),
            fillOpacity: 0.8,
            strokeWidth: 0.5,
            stroke: polygonRoot.interfaceColors.get("secondaryButtonHover"),
            templateField: "polygonSettings",
        });
        //Legend Settings
        const legend = chart.children.push(am5.Legend.new(polygonRoot, { useDefaultMarker: true, nameField: "name", fillField: "color", opacity: 0.8, strokeField: "color", clickTarget: "marker", centerX: am5.percent(50), x: am5.percent(50), y: am5.percent(100), centerY: am5.percent(100), dy: -20, background: am5.RoundedRectangle.new(polygonRoot, { fill: am5.color(0xffffff), fillOpacity: 0.2 }) }));
        legend.markerRectangles.template.setAll({ cornerRadiusTL: 10, cornerRadiusTR: 10, cornerRadiusBL: 10, cornerRadiusBR: 10 });
        type LegendDataItem = (typeof legend.dataItems)[0];

        //Hidding countrys
        legend.itemContainers.template.events.on("click", function (ev) {
            am5.array.each(polygonSeries.mapPolygons.values, function (mapPolygon) {
                const dataContext = mapPolygon.dataItem?.dataContext as dataContextType
                const legendDataItem = ev.target.dataItem as LegendDataItem;
                if (legendDataItem) {
                    const legendDataContext = legendDataItem.dataContext as dataType;
                    if (dataContext.id === legendDataContext.name) {
                        if (mapPolygon.get("disabled")) {
                            mapPolygon.setAll({ disabled: false, interactive: true });
                            legendDataItem.get("itemContainer").set("disabled", false);
                        } else {
                            mapPolygon.setAll({ disabled: true, interactive: false });
                            legendDataItem.get("itemContainer").set("disabled", true);
                        }
                    }
                }
            })
        });

        //Show countries related to the legend when hover over
        legend.itemContainers.template.events.on("pointerover", function (ev) {
            am5.array.each(polygonSeries.mapPolygons.values, function (mapPolygon) {
                if (!mapPolygon.get("disabled")) {
                    const dataContext = mapPolygon.dataItem?.dataContext as dataContextType;
                    const legendDataItem = ev.target.dataItem as LegendDataItem;
                    if (legendDataItem) {
                        const legendDataContext = legendDataItem.dataContext as dataType;
                        if (dataContext.id === legendDataContext.name) { mapPolygon.setAll({ fillOpacity: 1, strokeWidth: 2, stroke: polygonRoot.interfaceColors.get("secondaryButtonDown") }); }
                        else { mapPolygon.setAll({ fillOpacity: 0.7, strokeWidth: 0.7, stroke: polygonRoot.interfaceColors.get("secondaryButtonHover") }); }
                    }
                }
            })
        });

        legend.itemContainers.template.events.on("pointerout", function (ev) {
            am5.array.each(polygonSeries.mapPolygons.values, function (mapPolygon) {
                if (!mapPolygon.get("disabled")) {
                    const legendDataItem = ev.target.dataItem;
                    if (legendDataItem) { mapPolygon.setAll({ fillOpacity: 0.8, strokeWidth: 0.7, stroke: polygonRoot.interfaceColors.get("secondaryButtonHover") }); }
                }
            })
        });
        legend.data.setAll([{ name: "< 3", color: colors.getIndex(0), fillOpacity: 0.7 }, { name: "3 - 10", color: colors.getIndex(1), fillOpacity: 0.7 }, { name: "10 - 25", color: colors.getIndex(2), fillOpacity: 0.7 }, { name: "25 - 50", color: colors.getIndex(3), fillOpacity: 0.7 }, { name: "50 - 100", color: colors.getIndex(4), fillOpacity: 0.7 }, { name: "100 - 300", color: colors.getIndex(5), fillOpacity: 0.7 }, { name: "> 300", color: colors.getIndex(6), fillOpacity: 0.7 }]);

        polygonSeries.mapPolygons.template.states.create("hover", { fillOpacity: 1 });

        //Disable country
        polygonSeries.mapPolygons.template.states.create("disabled", { fill: polygonRoot.interfaceColors.get("disabled"), fillOpacity: 0.8, strokeWidth: 0.5, stroke: polygonRoot.interfaceColors.get("secondaryButtonHover") });

        //Selecting highest value country
        polygonSeries.events.on("datavalidated", function () {
            let highestPolygon: am5map.MapPolygon | undefined;
            polygonSeries.mapPolygons.each(function (mapPolygon: am5map.MapPolygon) {
                const data = mapPolygon.dataItem?.dataContext as dataType;
                if (highestNum <= data.value) {
                    highestPolygon = mapPolygon;
                }
            });

            if (highestPolygon) {
                highestPolygon.set("active", true);
                // Clear any existing selections and add the highest value country
                selectedCountries.clear();
                selectedCountries.add(highestPolygon);
                // Store the previous polygon
                previousPolygon = highestPolygon;
                // Update state with the selected country
                setCountriesData(
                    [...selectedCountries].map(
                        (c: am5map.MapPolygon) => c.dataItem?.dataContext as dataType
                    )
                );
            }
        });

        //Selecting country
        polygonSeries.mapPolygons.template.states.create("active", { fill: polygonRoot.interfaceColors.get("primaryButtonActive"), fillOpacity: 0.8 });
        polygonSeries.mapPolygons.template.events.on("click", (event) => { selectCountry(event as am5.ISpritePointerEvent & { type: "click"; target: am5map.MapPolygon }); });

        function selectCountry(event: am5.ISpritePointerEvent & { type: "click"; target: am5map.MapPolygon }) {
            const country: am5map.MapPolygon = event.target;
            const countryData = country.dataItem?.dataContext as dataType;
            const countryId: string = countryData.id;
            const shiftKey: boolean = !!(event.originalEvent && "shiftKey" in event.originalEvent && (event.originalEvent as MouseEvent).shiftKey);
            if (shiftKey) {
                // Shift + Click: Add or remove country from the selection
                if (selectedCountries.has(country)) {
                    selectedCountries.delete(country);
                } else {
                    selectedCountries.add(country);
                    if (country.get("active")) {
                        if (country) {
                            previousPolygon = country;
                        }
                    }
                }
            } else {
                // Check if the country is already selected
                if (selectedCountries.has(country)) {
                    if (selectedCountries.size > 1) {
                        // Normal click: Clear previous selections and select the new one
                        selectedCountries.forEach((selectedCountry: am5map.MapPolygon) => {
                            am5.array.each(polygonSeries.mapPolygons.values, function (mapPolygon: am5map.MapPolygon) {
                                const selectedCountryId = selectedCountry.get('id');
                                const selectedCountryData = mapPolygon.dataItem?.dataContext as dataType;
                                if (selectedCountryData.id === selectedCountryId) {
                                    mapPolygon.set("active", false);
                                }
                            });
                        });
                        selectedCountries.clear();
                        selectedCountries.add(country);

                        // Update state with the new selection & the previousPolygon with the newly selected country
                        setCountriesData([...countriesData, countryData]);
                        previousPolygon = country;
                    } else {
                        // Deselect the country
                        selectedCountries.delete(country);
                        selectedCountries.forEach((selectedCountry: am5map.MapPolygon) => {
                            am5.array.each(polygonSeries.mapPolygons.values, function (mapPolygon: am5map.MapPolygon) {
                                const selectedCountryId = selectedCountry.get('id');
                                const selectedCountryData = mapPolygon.dataItem?.dataContext as dataType;
                                if (selectedCountryData.id === selectedCountryId) {
                                    mapPolygon.set("active", false);
                                }
                            });
                        });
                        selectedCountries.clear();

                        // Remove the country data from the state & Update previousPolygon to null if it's the deselected country
                        const updatedCountriesData = countriesData.filter(data => data !== countryData);
                        setCountriesData(updatedCountriesData);
                        if (previousPolygon === country) {
                            previousPolygon = null as any;
                        }
                    }
                } else {
                    // Normal click: Clear previous selections and select the new one
                    selectedCountries.forEach((selectedCountry: am5map.MapPolygon) => {
                        am5.array.each(polygonSeries.mapPolygons.values, function (mapPolygon: am5map.MapPolygon) {
                            const selectedCountryId = selectedCountry.get('id');
                            const selectedCountryData = mapPolygon.dataItem?.dataContext as dataType;
                            if (selectedCountryData.id === selectedCountryId) {
                                mapPolygon.set("active", false);
                            }
                        });
                    });
                    selectedCountries.clear();
                    selectedCountries.add(country);

                    // Update state with the new selection & the previousPolygon with the newly selected country
                    setCountriesData([...countriesData, countryData]);
                    previousPolygon = country;
                }
            }
            setCountriesData(
                [...selectedCountries].map(
                    (c: am5map.MapPolygon) => c.dataItem?.dataContext as dataType
                )
            );
        }
        polygonSeries.data.setAll(PolygonMapData)

        // Add globe/map switch
        const cont = chart.children.push(am5.Container.new(polygonRoot, { layout: polygonRoot.horizontalLayout, x: 20, y: 40 }));
        cont.children.push(am5.Label.new(polygonRoot, { centerY: am5.p50, text: "Map", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));

        const switchButton = cont.children.push(am5.Button.new(polygonRoot, { themeTags: ["switch"], centerY: am5.p50, icon: am5.Circle.new(polygonRoot, { themeTags: ["icon"] }) }));
        switchButton.on("active", function () {
            if (!switchButton.get("active")) {
                chart.set("projection", am5map.geoMercator());
                backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
            } else {
                chart.set("projection", am5map.geoOrthographic());
                backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
            }
        });

        cont.children.push(am5.Label.new(polygonRoot, { centerY: am5.p50, text: "Globe", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));

        // Add zoom control
        const zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(polygonRoot, { x: 30, centerX: am5.p0, y: 60, centerY: am5.p0 }));
        const homeButton = zoomControl.children.moveValue(am5.Button.new(polygonRoot, { paddingTop: 10, paddingBottom: 10, icon: am5.Graphics.new(polygonRoot, { svgPath: "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8", fill: am5.color(0xffffff) }) }), 0)
        homeButton.events.on("click", function () { chart.goHome(); })

        // Set clicking on "water" to zoom out
        chart.chartContainer.get("background")?.events.on("click", function () { chart.goHome(); })

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(polygonRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(polygonRoot, {}),
            filePrefix: "Polygon_Map_Chart",
            pngOptions: { quality: 0.7 },
            jpgOptions: { quality: 0.7 },
            pdfOptions: { align: "center", pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false },
        });

        exporting.events.on("exportstarted", function () { homeButton.hide(); zoomControl.hide(); switchButton.hide(); cont.hide(); });
        exporting.events.on("exportfinished", function () { homeButton.show(); zoomControl.show(); switchButton.show(); cont.show(); });

        return () => polygonRoot && polygonRoot.dispose();
    }, [mode]);

    return (
        <>
            <div id="polygonMapChart" style={{ width: "100%", height: "650px" }}></div>
            {/* {countriesData.length > 0 ? (
            <AmChartMapChartDisplay countries={countriesData} />
            ) : (<Box sx={{ width: "100%", align: "center", p: 1 }}><Typography variant="h2" mb={5} mt={5}>No Country Selected</Typography></Box>)} */}
        </>
    );
};