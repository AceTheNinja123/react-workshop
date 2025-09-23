"use client";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Grid, ButtonGroup, Button, Box, Typography, Divider, CardContent, Stack } from "@mui/material";
// import { useDispatch, useSelector, datePickerDate, trendrange, yAxisType, diffDays, npstarget, location, SetLocation} from '@/state/store';
import { CircleFlag } from 'react-circle-flags'
import useStore, { type Store } from "@/state/store";

//Amcharts
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5index from "@amcharts/amcharts5/index";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { countries } from "./worldData"
import { dataType, PolygonMapData } from "../mapData"
interface geometryType { "type": string; "coordinates": Array<Array<number>> }
interface dataContextType { "geometry": geometryType; "geometryType": string; "madeFromGeoData": boolean; "id": string; "name": string; }
interface props { props: dataType; }
export default function MapColumnLineChart({ props }: props) {
    const customizer = useStore((state: Store) => state.customizer);

    // const data = props.data;
    const theme = useTheme();
    const mode = theme.palette.mode;
    // const Title = (data.length == 1) ? "Selected Country" : "Selected Countries";
    const Title = "Selected Country";
    useLayoutEffect(() => {
        const mapGroupChartRoot = am5.Root.new("chartdiv");
        //let colors = am5.ColorSet.new(mapGroupChartRoot, {colors:['#F9BC3F', '#8ED395', '#6ACDBB', '#A985D6', '#47C25E', '#40A4BF', '#28956D', '#225981', '#9BD45E', '#2A9D94', '#DF5A46', '#51BBC9', '#CB5034', '#28C89E', '#672644', '#308F90', '#19A4BD', '#87D8DC', '#F0C45F', '#E7804C'],});
        const colors = am5.ColorSet.new(mapGroupChartRoot, { step: 3 });
        // Set themes
        mapGroupChartRoot.setThemes([am5themes_Animated.new(mapGroupChartRoot)]);

        // Create chart
        const chart = mapGroupChartRoot.container.children.push(am5xy.XYChart.new(mapGroupChartRoot, { layout: mapGroupChartRoot.verticalLayout, paddingBottom: 40, paddingLeft: 20, paddingRight: 20, paddingTop: 50 }));
        const title = chart.children.unshift(am5.Label.new(mapGroupChartRoot, { text: Title, fontSize: 24, centerY: 30, textAlign: "center", width: am5.p100, paddingBottom: 50, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Line and Column chart that display Review Rating and Responses " + Title);

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);
        const easing = am5.ease.linear;

        // Create axes
        const xRenderer = am5xy.AxisRendererX.new(mapGroupChartRoot, { minGridDistance: 10 });
        xRenderer.labels.template.setAll({ oversizedBehavior: "wrap", rotation: -45, textAlign: "center", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.setAll({ location: 1 })
        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(mapGroupChartRoot, { categoryField: "date", renderer: xRenderer }));

        const yRenderer1 = am5xy.AxisRendererY.new(mapGroupChartRoot, { strokeOpacity: 0.1, });
        yRenderer1.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        const yAxis1 = chart.yAxes.push(am5xy.ValueAxis.new(mapGroupChartRoot, { min: 0, max: 100, maxPrecision: 0, strictMinMax: true, renderer: yRenderer1, numberFormat: "#'%'", }));

        const yRenderer2 = am5xy.AxisRendererY.new(mapGroupChartRoot, { opposite: true });
        yRenderer2.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        const yAxis2 = chart.yAxes.push(am5xy.ValueAxis.new(mapGroupChartRoot, { min: 0, maxPrecision: 0, renderer: yRenderer2, syncWithAxis: yAxis1 }));

        yAxis1.children.unshift(am5.Label.new(mapGroupChartRoot, {
            text: "Rating",
            rotation: -90,
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            position: "absolute",
            y: am5.percent(50),
            x: am5.percent(-20),
            centerY: am5.percent(50),
            paddingTop: 10,
            paddingBottom: 15,
            fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)
        }));

        yAxis2.children.unshift(am5.Label.new(mapGroupChartRoot, {
            text: "Review",
            rotation: 90,
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            position: "absolute",
            y: am5.percent(50),
            x: am5.percent(100),
            centerY: am5.percent(50),
            paddingTop: 10,
            paddingBottom: 35,
            fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)
        }));

        // Add legend
        const legend = chart.children.push(am5.Legend.new(mapGroupChartRoot, { useDefaultMarker: true, centerX: am5.p50, x: am5.p50, y: am5.percent(100), centerY: am5.percent(100) }));
        legend.labels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        legend.markers.template.setAll({ width: 30, height: 30 });
        legend.markerRectangles.template.setAll({
            cornerRadiusTL: 15,
            cornerRadiusTR: 15,
            cornerRadiusBL: 15,
            cornerRadiusBR: 15
        });

        // Handle legend item clicks for visibility toggling
        legend.itemContainers.template.events.on("click", function (e) {
            // Update tooltip content dynamically based on visible series
            tooltip.label.adapters.add("text", function (text, target) {
                let tooltipText = "";
                let heading = "";
                let i = 0;
                let bulletSymbolsIndex = 0;

                let maxLabelLength = 0;
                // Determine the maximum width for series name and legend label text
                chart.series.each(function (series) {
                    let labelText: string = ''
                    if (series) labelText = (series.get?.("name") ?? "") + (series.get?.("legendLabelText") ?? "");
                    if (labelText.length > maxLabelLength) { maxLabelLength = labelText.length; }
                });
                const labelWidth = (maxLabelLength * 6.5);

                chart.series.each(function (chartSeries) {
                    // Only include visible series in the tooltip
                    if (chartSeries.get("visible")) {
                        const tooltipDataItem = chartSeries.get("tooltipDataItem");
                        if (tooltipDataItem) {
                            if (i !== 0) { tooltipText += "\n"; }
                            const bullet = chartSeries.bulletsContainer;
                            let bulletSymbol = "■";
                            // Check the type of bullet and set the corresponding symbol
                            if (chartSeries instanceof am5xy.LineSeries) {
                                if (bulletSymbolsIndex < bulletSymbols.length) {
                                    bulletSymbol = bulletSymbols[bulletSymbolsIndex];
                                    bulletSymbolsIndex++;
                                } else {
                                    bulletSymbolsIndex = 0;
                                    bulletSymbol = bulletSymbols[bulletSymbolsIndex];
                                    bulletSymbolsIndex++;
                                }
                            }

                            heading = '[bold width:100px fontSize: "1.10rem"]' + tooltipDataItem.get("categoryX") + '[/]';

                            // Right-align valueY and pad series name and legend label text
                            const labelText =   (chartSeries.get?.("name") ?? "") + (chartSeries.get?.("legendLabelText") ?? "");
                            const tooltipValueY = tooltipDataItem.get("valueY");
                            //tooltipText +='[center' + chartSeries.get("fill") + 'width:15px ]' + bulletSymbol + '[/][bold width:10px ]|[/][' + chartSeries.get("fill") + 'bold width:' + labelWidth + ']' + labelText  + '[/][bold width:10px ]|[/]' + tooltipValueY;
                            tooltipText += '[center' + chartSeries.get("fill") + 'width:15px ]' + bulletSymbol + '[/][bold width:10px ]|[/][bold width:' + labelWidth + ']' + labelText + '[/][bold width:10px ]|[/]' + tooltipValueY;
                        }
                        i++;
                    }
                });
                const Tooltip = heading + '\n' + tooltipText
                return Tooltip
            });
            chart.plotContainer.set("tooltip", tooltip);
        });

        // Handle legend hover for series highlight
        legend.itemContainers.template.events.on("pointerover", function (e) {
            const itemContainer = e.target;
            // As series list is data of a legend, dataContext is series
            const series = itemContainer.dataItem?.dataContext;
            chart.series.each(function (chartSeries) {
                if (chartSeries != series) {
                    if (chartSeries instanceof am5xy.ColumnSeries) {
                        chartSeries.set("opacity", 0.15);
                        chartSeries.bulletsContainer.set("opacity", 0.15);
                    }
                    else if (chartSeries instanceof am5xy.LineSeries) {
                        chartSeries.strokes.template.set("opacity", 0.15);
                        chartSeries.bulletsContainer.set("opacity", 0.15);
                    };
                }
                else {
                    if (chartSeries instanceof am5xy.ColumnSeries) { chartSeries.set("opacity", 1); }
                    else if (chartSeries instanceof am5xy.LineSeries) {
                        chartSeries.strokes.template.setAll({ strokeWidth: 3 });
                        chartSeries.bulletsContainer.set("opacity", 1);
                    };
                }
            });
            legend.itemContainers.each(function (itemContainer) {
                const legendseries = itemContainer.dataItem?.dataContext;
                if (legendseries != series) { itemContainer.set("opacity", 0.5); }
                else { itemContainer.set("opacity", 1); }
            });
        });

        // Restore all series visibility when mouse leaves the legend item
        legend.itemContainers.template.events.on("pointerout", function (e) {
            chart.series.each(function (chartSeries) {
                if (chartSeries instanceof am5xy.ColumnSeries) {
                    chartSeries.set("opacity", 1);
                    chartSeries.bulletsContainer.set("opacity", 1);
                }
                else if (chartSeries instanceof am5xy.LineSeries) {
                    chartSeries.strokes.template.setAll({ opacity: 1, strokeWidth: 2 });
                    chartSeries.bulletsContainer.set("opacity", 1);
                };
            });
            legend.itemContainers.each(function (itemContainer) { itemContainer.set("opacity", 1); });
        });

        const bulletShapes = [
            (mapGroupChartRoot: am5.Root) => am5.Circle.new(mapGroupChartRoot, { radius: 10, centerX: am5.p50, centerY: am5.p50 }),
            (mapGroupChartRoot: am5.Root) => am5.Triangle.new(mapGroupChartRoot, { width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (mapGroupChartRoot: am5.Root) => am5.Star.new(mapGroupChartRoot, { width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (mapGroupChartRoot: am5.Root) => am5.Rectangle.new(mapGroupChartRoot, { width: 15, height: 25, centerX: am5.p50, centerY: am5.p50 }),
            (mapGroupChartRoot: am5.Root) => am5.Triangle.new(mapGroupChartRoot, { rotation: 180, width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (mapGroupChartRoot: am5.Root) => am5.Rectangle.new(mapGroupChartRoot, { rotation: 45, width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (mapGroupChartRoot: am5.Root) => am5.Star.new(mapGroupChartRoot, { width: 15, height: 15, spikes: 8, centerX: am5.p50, centerY: am5.p50 }),
        ];

        // Add series
        const createSeries = (seriesType: string, data: Array<string>, name: string, bulletValue: number, legendText: string, countryCode: string) => {
            const color = colors.next();
            title.hide();
            xAxis.data.setAll(data);
            const countryFlag = "https://hatscripts.github.io/circle-flags/flags/" + countryCode.toLowerCase() + ".svg";
            const bulletSize = calculateBulletSize(data.length);

            if (seriesType == 'Line') {
                const lineSeries = chart.series.push(am5xy.LineSeries.new(mapGroupChartRoot, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis1,
                    valueYField: "rating",
                    sequencedInterpolation: true,
                    categoryXField: "date",
                    fill: color,
                    legendLabelText: legendText || "",
                    //tooltip: am5.Tooltip.new(mapGroupChartRoot, {readerAnnounce: true,labelText: "{name} in {categoryX}: {valueY}"})
                }));

                lineSeries.strokes.template.setAll({ strokeWidth: 5, strokeOpacity: 0.8, stroke: color });
                lineSeries.data.setAll(data);
                /*lineSeries.bullets.push((root, series) => {
                    const shapeIndex = bulletValue % bulletShapes.length;
                    const bulletShape = bulletShapes[shapeIndex](root);
                    bulletShape.set("fill",series.get("fill"))
                    return am5.Bullet.new(root, {sprite: bulletShape});
                });*/

                lineSeries.bullets.push(function () {
                    const container = am5.Container.new(mapGroupChartRoot, { centerX: am5.p50, centerY: am5.p50 });
                    container.children.push(am5.Picture.new(mapGroupChartRoot, { centerX: am5.p50, centerY: am5.p50, width: bulletSize, height: bulletSize, src: countryFlag }));
                    const circle = am5.Circle.new(mapGroupChartRoot, { centerX: am5.p50, centerY: am5.p50, radius: 15, stroke: lineSeries.get("fill"), strokeWidth: 5, fill: am5.color("#FFFFFF") });
                    container.set("mask", circle)
                    return am5.Bullet.new(mapGroupChartRoot, { sprite: container });
                });

                if (legendText) { legend.data.push(lineSeries); }
                const legendDataItem = legend.dataItems[legend.dataItems.length - 1];
                const marker = legendDataItem.get("marker");
                const picture = marker.children.push(am5.Picture.new(mapGroupChartRoot, {
                    width: 20,
                    height: 20,
                    src: countryFlag,
                    dx: 5,
                    dy: 5,
                    saturate: 1
                }));
                picture.states.create("disabled", { saturate: 0, opacity: 0.5 })
                //legendDataItem.get("markerRectangle").set("forceHidden", true);

                return lineSeries
            } else {
                const columnSeries = chart.series.push(am5xy.ColumnSeries.new(mapGroupChartRoot, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis2,
                    valueYField: "num_reviews",
                    sequencedInterpolation: true,
                    categoryXField: "date",
                    fill: color,
                    legendLabelText: legendText || "",
                    maskBullets: false
                    //tooltip: am5.Tooltip.new(mapGroupChartRoot, {readerAnnounce: true,labelText: "{name} in {categoryX}: {valueY}"})
                }));

                columnSeries.columns.template.setAll({ width: am5.percent(60), cornerRadiusTL: 5, cornerRadiusTR: 5, });
                const circleTemplate: am5.Template<am5.Circle> = am5.Template.new({});
                columnSeries.bullets.push(function (mapGroupChartRoot, series, dataItem) {
                    const bulletContainer = am5.Container.new(mapGroupChartRoot, {});
                    const circle = bulletContainer.children.push(am5.Circle.new(mapGroupChartRoot, { radius: bulletSize }, circleTemplate));
                    const maskCircle = bulletContainer.children.push(am5.Circle.new(mapGroupChartRoot, { radius: bulletSize }));
                    const imageContainer = bulletContainer.children.push(am5.Container.new(mapGroupChartRoot, { mask: maskCircle }));

                    const image = imageContainer.children.push(
                        am5.Picture.new(mapGroupChartRoot, {
                            src: countryFlag,
                            centerX: am5.percent(50),
                            centerY: am5.percent(50),
                            width: bulletSize,
                            height: bulletSize
                        })
                    );

                    return am5.Bullet.new(mapGroupChartRoot, { locationY: 1, sprite: bulletContainer });
                });

                columnSeries.data.setAll(data);
                columnSeries.appear(1000, 50);

                if (legendText) { legend.data.push(columnSeries); }
                const legendDataItem = legend.dataItems[legend.dataItems.length - 1];
                const marker = legendDataItem.get("marker");
                const picture = marker.children.push(am5.Picture.new(mapGroupChartRoot, {
                    width: 20,
                    height: 20,
                    src: countryFlag,
                    saturate: 1,
                    dx: 5,
                    dy: 5,
                }));
                picture.states.create("disabled", { saturate: 0, opacity: 0.5 })
                //legendDataItem.get("markerRectangle").set("forceHidden", true);

                return columnSeries;
            }
        }

        function calculateBulletSize(dataLength: number) {
            const maxSize = 40;
            const minSize = 20;
            const sizeFactor = 50 / dataLength;
            return Math.max(minSize, Math.min(maxSize, sizeFactor));
        }

        // if (data && data.length > 0) {
        //     data.forEach(function (item, index) {
        //         Object.keys(item).map((key) => {
        //             countries.map((item2) => {
        //                 if (key == item2.name) {
        //                     createSeries("Line", item[key], key, index, "{name} Review Rating", item2.code);
        //                     createSeries("Column", item[key], key, index, "{name} Responses", item2.code);
        //                 }
        //             });
        //         });
        //     });
        //     //setTimeout(() => {legend.data.setAll(chart.series.values);}, 100);
        // }

        const tooltip = am5.Tooltip.new(mapGroupChartRoot, {});
        tooltip.get("background")?.setAll({ fill: am5.color(0xe5e5e5), fillOpacity: 0.8, stroke: am5.color(0x000000), strokeOpacity: 0.8 });

        chart.plotContainer.set("tooltipPosition", "pointer");
        chart.plotContainer.set("tooltipText", "a");
        chart.plotContainer.set("tooltip", tooltip);

        const bulletSymbols = ['●'];

        tooltip.label.adapters.add("text", function (text, target) {
            text = "";
            let heading = "";
            let i = 0;
            let bulletSymbolsIndex = 0;
            let maxLabelLength = 0;

            // Determine the maximum width for series name and legend label text
            chart.series.each(function (series) {
                let labelText = (series.get("name") ?? "") + (series.get("legendLabelText") ?? "");
                if (labelText.length > maxLabelLength) { maxLabelLength = labelText.length; }
            });

            let labelWidth = (maxLabelLength * 6.5);

            chart.series.each(function (series) {
                let tooltipDataItem = series.get("tooltipDataItem");
                if (tooltipDataItem) {
                    if (i != 0) { text += "\n"; }
                    let bullet = "https://hatscripts.github.io/circle-flags/flags/za.svg";
                    let bulletSymbol = "■";
                    // Check the type of bullet and set the corresponding symbol
                    if (series instanceof am5xy.LineSeries) {
                        if (bulletSymbolsIndex < bulletSymbols.length) {
                            bulletSymbol = bulletSymbols[bulletSymbolsIndex];
                            bulletSymbolsIndex++;
                        } else {
                            bulletSymbolsIndex = 0;
                            bulletSymbol = bulletSymbols[bulletSymbolsIndex];
                            bulletSymbolsIndex++;
                        }
                    }

                    heading = '[bold width:100px fontSize: "1.05rem"]' + tooltipDataItem.get("categoryX") + '[/]';

                    // Right-align valueY and pad series name and legend label text
                    let labelText = (series.get("name") ?? "") + (series.get("legendLabelText") ?? "");
                    let tooltipValueY = tooltipDataItem.get("valueY");
                    text += '[' + series.get("fill") + 'bold width:' + labelWidth + ']' + labelText + '[/][bold width:10px ]|[/]' + tooltipValueY;
                    //text += '[center' + series.get("fill") + 'width:15px ]' + bulletSymbol + '[/][bold width:10px ]|[/][bold width:' + labelWidth + ']' + labelText  + '[/][bold width:10px ]|[/]' + tooltipValueY;
                }
                i++;
            });
            let Tooltip = heading + '\n' + text
            return Tooltip
        });

        const cursor = chart.set("cursor", am5xy.XYCursor.new(mapGroupChartRoot, { behavior: "none", xAxis: xAxis }))

        // Make stuff animate on load
        chart.appear(1000, 100);

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(mapGroupChartRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(mapGroupChartRoot, {}),
            //filePrefix: (data.length == 1) ? "SelectedCountryChart" : "SelectedCountriesChart",
            filePrefix: "SelectedCountryChart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { align: "center", pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false },
        });

        exporting.events.on("exportstarted", function () { title.show(); });
        exporting.events.on("exportfinished", function () { title.hide(); });

        return () => mapGroupChartRoot && mapGroupChartRoot.dispose();
    }, [props]);

    return (<><div id="chartdiv" style={{ width: "100%", height: "500px" }}></div></>);
};