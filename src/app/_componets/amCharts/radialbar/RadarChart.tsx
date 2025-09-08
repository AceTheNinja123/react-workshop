"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';

import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
interface dataType { categories: string; value: number; }
const seriesradarchart2 = [{ name: "Sales", data: [{ categories: "January", value: 80 }, { categories: "February", value: 50 }, { categories: "March", value: 30 }, { categories: "April", value: 40 }, { categories: "May", value: 100 }, { categories: "June", value: 20 }] }];

export default function RadarChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    useLayoutEffect(() => {
        const RadarRoot = am5.Root.new("piediv");

        // Set themes
        RadarRoot.setThemes([am5themes_Animated.new(RadarRoot)]);

        // Create chart
        const chart = RadarRoot.container.children.push(am5radar.RadarChart.new(RadarRoot, { layout: RadarRoot.verticalLayout, radius: am5.percent(90), paddingBottom: 40, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Radar chart");

        // Add cursor
        const cursor = chart.set("cursor", am5radar.RadarCursor.new(RadarRoot, { behavior: "none" }));
        cursor.lineY.set("visible", false);

        // Create axes and their renderers
        const xRenderer = am5radar.AxisRendererCircular.new(RadarRoot, {});
        xRenderer.labels.template.setAll({ radius: 10, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(RadarRoot, { maxDeviation: 0, categoryField: "categories", renderer: xRenderer, tooltip: am5.Tooltip.new(RadarRoot, {}) }));

        const yRenderer = am5radar.AxisRendererRadial.new(RadarRoot, {});
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(RadarRoot, { renderer: yRenderer }));

        const createSeries = (name: string, data: Array<dataType>) => {
            const series = chart.series.push(am5radar.RadarLineSeries.new(RadarRoot, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "categories",
                legendLabelText: name || ""
            }));

            series.strokes.template.setAll({ strokeWidth: 1 });

            series.bullets.push(function () {
                return am5.Bullet.new(RadarRoot, {
                    sprite: am5.Circle.new(RadarRoot, {
                        radius: 5,
                        stroke: RadarRoot.interfaceColors.get("background"),
                        strokeWidth: 2,
                        fill: series.get("fill")
                    })
                });
            });
            series.fills.template.setAll({ visible: true, fillOpacity: 0.4 });
            series.strokes.template.setAll({ strokeWidth: 5 });
            series.data.setAll(data);

            //if (name) {legend.data.push(series);}
            xAxis.data.setAll(data);

            return series;
        }
        if (seriesradarchart2) { seriesradarchart2.forEach(function (item,) { createSeries(item.name, item.data); }); }

        const tooltip = am5.Tooltip.new(RadarRoot, {});
        tooltip.get("background")!.setAll({ fill: am5.color(0xe5e5e5), fillOpacity: 0.8, stroke: am5.color(0x000000), strokeOpacity: 0.8 });

        chart.plotContainer.set("tooltipPosition", "pointer");
        chart.plotContainer.set("tooltipText", "a");
        chart.plotContainer.set("tooltip", tooltip);

        // tooltip.label.adapters.add("text", function (_text, target) {
        //     let text = "";
        //     let heading = "";
        //     let maxLabelLength = 0;

        //     // First: calculate the maximum legend label length
        //     chart.series.each(function (series) {
        //         const labelText = series.get("legendLabelText") ?? "";
        //         if (labelText.length > maxLabelLength) {
        //             maxLabelLength = labelText.length;
        //         }
        //     });

        //     // Build tooltip content
        //     chart.series.each(function (series, i) {
        //         const tooltipDataItem = series.get("tooltipDataItem");
        //         if (!tooltipDataItem) return;

        //         const labelText = series.get("legendLabelText") ?? "";
        //         const tooltipValueY = tooltipDataItem.get("valueY") ?? "";
        //         const tooltipValueX = tooltipDataItem.get("categoryX") ?? "";

        //         // Heading (only once, at the top)
        //         if (i === 0) {
        //             heading = `[fontSize: 16px bold underline]${tooltipValueX}[/]\n\n`;
        //         }

        //         // Convert fill color to CSS hex string
        //         const fillColor = series.get("fill")?.toCSSHex() ?? "#000000";

        //         // Build a row like: ●  SeriesName          |   123
        //         text += `[${fillColor} width:15px]●[/] `; // bullet with series color
        //         text += `[bold width:${maxLabelLength * 8}]${labelText}[/]`; // aligned series name
        //         text += ` : [${fillColor}]${tooltipValueY}[/]\n`; // aligned value
        //     });

        //     return heading + text;
        // });



        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(RadarRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(RadarRoot, { useDefaultCSS: false }),
            filePrefix: "Radar_Chart",
            //title: "Review Rating Column Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => RadarRoot && RadarRoot.dispose();
    }, [mode]);

    return (<><div id="piediv" style={{ width: "100%", height: "400px" }}></div></>);
};