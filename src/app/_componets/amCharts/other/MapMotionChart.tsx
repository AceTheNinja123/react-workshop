// "use client";
// import React, { useLayoutEffect, useEffect, useState } from "react";
// import { Grid, Typography, Box } from "@mui/material";
// import { useTheme } from '@mui/material/styles';
// import dynamic from "next/dynamic";
// import { startYear, endYear } from '@/state/store'
// import { countries, type Country } from "./mapMotionData";
// //Amcharts
// import * as am5 from "@amcharts/amcharts5";
// import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
// import am5index from "@amcharts/amcharts5/index";
// import * as am5xy from "@amcharts/amcharts5/xy";
// import * as am5map from "@amcharts/amcharts5/map";
// import am5geodata_continentsLow from "@amcharts/amcharts5-geodata/continentsLow";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// interface yearDataType {
//     id: string,
//     name: string,
//     continent: string,
//     settings: { fill: am5.Color },
//     x: number,
//     y: number,
//     value: number
// }
// export default function MapMotionChart() {
//     const theme = useTheme();
//     const mode = theme.palette.mode;

//     useLayoutEffect(() => {
//         // Create MapMotionRoot element
//         const MapMotionRoot = am5.Root.new("MapMotionChartDiv");

//         // Set themes
//         MapMotionRoot.setThemes([am5themes_Animated.new(MapMotionRoot)]);

//         const continents = { "AF": "Africa", "AS": "Asia", "EU": "Europe", "NA": "North America", "SA": "South America", "OC": "Oceania", "AN": "Antarctica" }
//         const colorSet = am5.ColorSet.new(MapMotionRoot, { step: 2 });
//         const colors: Record<string, am5.Color> = { EU: colorSet.getIndex(0), NA: colorSet.getIndex(2), SA: colorSet.getIndex(4), AS: colorSet.getIndex(6), AF: colorSet.getIndex(8), OC: colorSet.getIndex(10), }

//         const yearData: Record<string, yearDataType[]> = {};
//         const firstYear = startYear;
//         const lastYear = endYear;
//         const currentYear = firstYear;

//         for (let year = firstYear; year <= lastYear; year++) {
//             const data: yearDataType[] = [];
//             yearData[`${year}`] = data;

//             let i = 0;
//             am5.object.each(countries, function (id: string, country: Country) {
//                 if (year == firstYear) {
//                     const continent = country.continent;
//                     const dObj = {
//                         id: id,
//                         name: country.name,
//                         continent: country.continent,
//                         settings: { fill: colors[continent] },
//                         x: Math.random() * 100 * Math.random() * 2 + 1 + i * 2,
//                         y: Math.random() * 40 * Math.random() + 1 + i / 10,
//                         value: Math.round(Math.random() * 500) + Math.random() * 500
//                     }
//                     data.push(dObj);
//                     // country.data = [dObj];
//                 } else {
//                     const previous = yearData[year - 1][i];
//                     const dObj = {
//                         id: id,
//                         name: country.name,
//                         continent: country.continent,
//                         settings: { fill: colors[country.continent] },
//                         x: previous.x + (Math.random() * 10 - 3),
//                         y: previous.y + (Math.random() * 2 - 0.6),
//                         value: Math.abs(previous.value + (Math.random() * 100 - 40))
//                     }
//                     data.push(dObj);
//                     // country.data.push(dObj);
//                 }
//                 i++;
//             })
//         }

//         // main container
//         const mainContainer = MapMotionRoot.container.children.push(am5.Container.new(MapMotionRoot, { width: am5.p100, height: am5.p100, layout: MapMotionRoot.verticalLayout, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 20, }))

//         // Create chart
//         const chart = mainContainer.children.push(am5xy.XYChart.new(MapMotionRoot, { panX: false, panY: false, wheelY: "none", pinchZoomX: false, pinchZoomY: false }));

//         // Set screen reader text for the chart
//         chart.set("ariaLabel", "A Map Motion chart");

//         // We don't want zoom-out button to appear while animating, so we hide it
//         chart.zoomOutButton.set("forceHidden", true);
//         const easing = am5.ease.linear;

//         // Create axes
//         const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(MapMotionRoot, { min: 0, renderer: am5xy.AxisRendererX.new(MapMotionRoot, { minGridDistance: 50 }) }));
//         xAxis.children.push(am5.Label.new(MapMotionRoot, { text: "Hypothetical metric X", x: am5.p50, centerX: am5.p50, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));
//         xAxis.get("renderer").labels.template.setAll({ fontSize: 12, location: 0.5, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

//         const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(MapMotionRoot, { min: 0, renderer: am5xy.AxisRendererY.new(MapMotionRoot, {}) }));
//         yAxis.children.moveValue(am5.Label.new(MapMotionRoot, { text: "Hypothetical metric Y", rotation: -90, y: am5.p50, centerX: am5.p50, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }), 0);
//         yAxis.get("renderer").labels.template.setAll({ fontSize: 12, location: 0.5, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

//         // Create series
//         const bubbleSeries = chart.series.push(am5xy.LineSeries.new(MapMotionRoot, {
//             calculateAggregates: true,
//             xAxis: xAxis,
//             yAxis: yAxis,
//             valueYField: "y",
//             valueXField: "x",
//             valueField: "value"
//         }));

//         bubbleSeries.strokes.template.set("visible", false);

//         // Add bullet
//         const circleTemplate: am5.Template<am5.Circle> = am5.Template.new({tooltipY: 0});
//         circleTemplate.states.create("transparent", { opacity: 0.15 });
//         circleTemplate.events.on("pointerover", handleOver);
//         circleTemplate.events.on("pointerout", handleOut);
//         circleTemplate.events.on("click", handleClick);

//         function handleOver(e) {
//             const target = e.target;
//             am5.array.each(bubbleSeries.dataItems, function (dataItem) {
//                 if (dataItem.bullets) {
//                     const bullet = dataItem.bullets[0];
//                     if (bullet) {
//                         const sprite = bullet.get("sprite");
//                         if (sprite && sprite != target) { sprite.states.applyAnimate("transparent"); }
//                     }
//                 }
//             })
//         }

//         interface HandleOutEvent {
//             target: am5.Sprite;
//         }

//         interface BulletDataItem {
//             bullets?: am5.Bullet[];
//             [key: string]: any;
//         }

//         function handleOut(e: HandleOutEvent) {
//             am5.array.each(bubbleSeries.dataItems as BulletDataItem[], function (dataItem: BulletDataItem) {
//                 if (dataItem.bullets) {
//                     const bullet = dataItem.bullets[0];
//                     if (bullet) {
//                         const sprite = bullet.get("sprite") as am5.Sprite;
//                         if (sprite) { sprite.states.applyAnimate("default"); }
//                     }
//                 }
//             });
//         }
//         type BubbleDataItem = typeof bubbleSeries["dataItems"][0];
//         let selectedDataItem: BubbleDataItem | undefined;
//         function handleClick(e: HandleOutEvent) {
//             const dataItem = e.target.dataItem;
//             if (dataItem && selectedDataItem == dataItem) {
//                 am5.array.each(bubbleSeries.dataItems, function (dataItem) {
//                     if(dataItem.bullets) {
//                         const bullet = dataItem.bullets[0];
//                         const sprite = bullet.get("sprite");
//                         sprite.setAll({ fillOpacity: 1 });
//                     }
//                 })
//                 lineSeries.data.clear();
//             } else {
//                 selectedDataItem = e.target.dataItem;

//                 lineSeries.data.setAll(countries[selectedDataItem.dataContext.id].data);
//                 lineSeries.show();

//                 am5.array.each(bubbleSeries.dataItems, function (dataItem) {
//                     if(dataItem.bullets) {
//                         const bullet = dataItem.bullets[0];
//                         const sprite = bullet.get("sprite");
//                         if (dataItem != selectedDataItem) { sprite.set("fillOpacity", 0.15); }
//                         else { sprite.set("fillOpacity", 1); }
//                     }
//                 })
//             }
//         }

//         // bubbleSeries.bullets.push(function () {
//         //     const bulletCircle = am5.Circle.new(MapMotionRoot, {
//         //         radius: 5,
//         //         templateField: "settings",
//         //         fillOpacity: 0.9,
//         //         tooltipText: "[fontSize:18px; bold]{name}[/]\n[bold]Metric Y:[/] {valueY}\n[bold]Metric X:[/] {valueX}$\n[bold]Total Responses:[/]  {value}"
//         //     }, circleTemplate);
//         //     return am5.Bullet.new(MapMotionRoot, { sprite: bulletCircle });
//         // });

//         // // Add heat rule
//         // bubbleSeries.set("heatRules", [{ target: circleTemplate, min: 3, max: 35, dataField: "value", key: "radius", maxValue: 4000 }]);

//         // line series
//         const lineSeries = chart.series.push(am5xy.LineSeries.new(MapMotionRoot, {
//             valueXField: "x",
//             valueYField: "y",
//             xAxis: xAxis,
//             yAxis: yAxis,
//             stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)
//         }))

//         lineSeries.strokes.template.set("strokeOpacity", 0.3);
//         lineSeries.bullets.push(function () {
//             const bulletCircle = am5.Circle.new(MapMotionRoot, { radius: 2, fill: lineSeries.stroke });
//             return am5.Bullet.new(MapMotionRoot, { sprite: bulletCircle });
//         });

//         // // Add cursor
//         // const cursor = chart.set("cursor", am5xy.XYCursor.new(MapMotionRoot, { xAxis: xAxis, yAxis: yAxis, snapToSeries: [bubbleSeries] }));
//         // cursor.lineX.set("visible", false);
//         // cursor.lineY.set("visible", false);

//         // // Add scrollbars
//         // //chart.set("scrollbarX", am5.Scrollbar.new(MapMotionRoot, {orientation: "horizontal", exportable:false}));
//         // //chart.set("scrollbarY", am5.Scrollbar.new(MapMotionRoot, {orientation: "vertical", exportable:false}));

//         // // Label
//         // const yearLabel = chart.plotContainer.children.push(am5.Label.new(MapMotionRoot, {
//         //     text: currentYear.toString(),
//         //     fontSize: "10em",
//         //     fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff),
//         //     opacity: 0.15,
//         //     x: am5.p50,
//         //     y: am5.p50,
//         //     fontFamily: "Courier New",
//         //     textAlign: "right",
//         //     centerY: am5.p50,
//         //     centerX: am5.p50
//         // }));

//         // // Create controls
//         // const yearSliderContainer = mainContainer.children.push(am5.Container.new(MapMotionRoot, { width: am5.percent(100), layout: MapMotionRoot.horizontalLayout, paddingLeft: 70, paddingRight: 40, exportable: false }));

//         // const playButton = yearSliderContainer.children.push(am5.Button.new(MapMotionRoot, { themeTags: ["play"], centerY: am5.p50, marginRight: 20, icon: am5.Graphics.new(MapMotionRoot, { themeTags: ["icon"] }) }));
//         // playButton.events.on("click", function () {
//         //     if (playButton.get("active")) { slider.set("start", slider.get("start") + 0.0001); }
//         //     else { slider.animate({ key: "start", to: 1, duration: 15000 * (1 - slider.get("start")) }); }
//         // });

//         // const slider = yearSliderContainer.children.push(am5.Slider.new(MapMotionRoot, { orientation: "horizontal", start: 0, centerY: am5.p50 }));
//         // slider.on("start", function (start) { if (start === 1) { playButton.set("active", false); } });
//         // slider.events.on("rangechanged", function () { updateSeriesData(firstYear + Math.round(slider.get("start", 0) * (lastYear - firstYear))); });

//         // // Create the map chart
//         // const navMap = chart.plotContainer.children.push(am5map.MapChart.new(MapMotionRoot, {
//         //     projection: am5map.geoNaturalEarth1(),
//         //     rotationX: -11,
//         //     width: 250,
//         //     height: 100,
//         //     x: am5.percent(100),
//         //     y: am5.percent(100),
//         //     centerY: am5.percent(100),
//         //     centerX: am5.percent(100),
//         //     panY: "none",
//         //     panX: "none",
//         //     draggable: true,
//         // }));

//         // // Create main polygon series for countries
//         // const polygonSeries = navMap.series.push(am5map.MapPolygonSeries.new(MapMotionRoot, { geoJSON: am5geodata_continentsLow, exclude: ["antarctica"] }));

//         // const polygonTemplate = polygonSeries.mapPolygons.template;
//         // polygonTemplate.setAll({ templateField: "settings", tooltipText: "{name}", interactive: true });
//         // polygonTemplate.states.create("disabled", { fill: MapMotionRoot.interfaceColors.get("disabled") });
//         // polygonTemplate.events.on("pointerover", handleContinentOver);
//         // polygonTemplate.events.on("click", handleContinentClick);
//         // polygonTemplate.events.on("pointerout", handleOut);

//         // function handleContinentOver(e) {
//         //     const target = e.target;
//         //     am5.array.each(bubbleSeries.dataItems, function (dataItem) {
//         //         if (dataItem.bullets) {
//         //             const bullet = dataItem.bullets[0];
//         //             if (bullet) {
//         //                 const sprite = bullet.get("sprite");
//         //                 if (sprite) {
//         //                     if (target.dataItem.dataContext.code == sprite.dataItem.dataContext.continent) { sprite.states.applyAnimate("default"); }
//         //                     else { sprite.states.applyAnimate("transparent"); }
//         //                 }
//         //             }
//         //         }
//         //     })
//         // }

//         // let selectedContinent: unknown = undefined;

//         // function handleContinentClick(e) {
//         //     const target = e.target;
//         //     if (target.dataItem == selectedContinent) {
//         //         selectedContinent = undefined;
//         //         am5.array.each(polygonSeries.dataItems, function (dataItem) {
//         //             const mapPolygon = dataItem.get("mapPolygon");
//         //             mapPolygon.states.applyAnimate("default");
//         //         })
//         //         am5.array.each(bubbleSeries.dataItems, function (dataItem) {
//         //             const bullet = dataItem.bullets[0];
//         //             if (bullet) {
//         //                 const sprite = bullet.get("sprite");
//         //                 if (sprite) { sprite.set("forceHidden", false); }
//         //             }
//         //         })
//         //     }
//         //     else {
//         //         selectedContinent = target.dataItem;
//         //         am5.array.each(polygonSeries.dataItems, function (dataItem) {
//         //             const mapPolygon = dataItem.get("mapPolygon");
//         //             if (dataItem != selectedContinent) { mapPolygon.states.applyAnimate("disabled"); }
//         //             else { mapPolygon.states.applyAnimate("default"); }
//         //         })
//         //         am5.array.each(bubbleSeries.dataItems, function (dataItem) {
//         //             if (dataItem.bullets) {
//         //                 const bullet = dataItem.bullets[0];
//         //                 const sprite = bullet.get("sprite");
//         //                 if (target.dataItem.dataContext.code == sprite.dataItem.dataContext.continent) { sprite.set("forceHidden", false); }
//         //                 else { sprite.set("forceHidden", true); }
//         //             }
//         //         })
//         //     }
//         // }

//         // polygonSeries.data.setAll([{ id: "europe", code: "EU", settings: { fill: colors.EU } }, { id: "northAmerica", code: "NA", settings: { fill: colors.NA } }, { id: "southAmerica", code: "SA", settings: { fill: colors.SA } }, { id: "asia", code: "AS", settings: { fill: colors.AS } }, { id: "africa", code: "AF", settings: { fill: colors.AF } }, { id: "oceania", code: "OC", settings: { fill: colors.OC } }])

//         // function updateSeriesData(year) {
//         //     if (currentYear != year) {
//         //         currentYear = year;
//         //         const data = yearData[year];
//         //         const i = 0;
//         //         am5.array.each(data, function (item) {
//         //             bubbleSeries.data.setIndex(i, item);
//         //             i++;
//         //         });
//         //         yearLabel.set("text", year.toString());
//         //     }
//         // }

//         // bubbleSeries.data.setAll(yearData[currentYear]);

//         // // Make stuff animate on load
//         // bubbleSeries.appear(1000);
//         // chart.appear(1000, 100);

//         // //Exporting
//         // const exporting = am5plugins_exporting.Exporting.new(MapMotionRoot, {
//         //     menu: am5plugins_exporting.ExportingMenu.new(MapMotionRoot, {}),
//         //     filePrefix: "Map Motion Chart",
//         //     pngOptions: { quality: 0.7 },
//         //     jpgOptions: { quality: 0.7 },
//         //     pdfOptions: { includeToc: true, paperSize: "A4", pageMargins: [15, 15, 15, 15], pageOrientation: "portrait" },
//         //     docxOptions: { landscape: true, fileHeader: "Total Response by Country" },
//         //     htmlOptions: { disableFonts: true },
//         //     pptxOptions: { landscape: true, fileHeader: "Total Response by Country" }
//         // });

//         // exporting.events.on("exportstarted", function () { homeButton.hide(); zoomControl.hide(); switchButton.hide(); cont.hide(); });
//         // exporting.events.on("exportfinished", function () { homeButton.show(); zoomControl.show(); switchButton.show(); cont.show(); });

//         return () => MapMotionRoot && MapMotionRoot.dispose();
//     }, [mode]);

//     return (<><div id="MapMotionChartDiv" style={{ width: "100%", height: "500px" }}></div></>);
// };