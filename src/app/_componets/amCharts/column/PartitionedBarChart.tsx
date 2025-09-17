
'use client'
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';

//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useTranslation } from "react-i18next";

const PartitionedBarChart = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;

    useLayoutEffect(() => {
        const PartitionedBarChartRoot = am5.Root.new("PartitionedBarChartDiv");
        const colors = am5.ColorSet.new(PartitionedBarChartRoot, { step: 2, colors: customColors.map(color => am5.color(color)) });

        // Set themes
        PartitionedBarChartRoot.setThemes([am5themes_Animated.new(PartitionedBarChartRoot)]);

        // Create chart
        const chart = PartitionedBarChartRoot.container.children.push(am5xy.XYChart.new(PartitionedBarChartRoot, { panX: false, panY: false, wheelX: "none", wheelY: "none", paddingBottom: 40, paddingLeft: 20, paddingRight: 20, paddingTop: 40, layout: PartitionedBarChartRoot.verticalLayout, }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Column chart that shows Primary Service Ratings");

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);

        // Add legend
        let legendData: Array<{ name: string; color: am5.Color }> = [];
        let legend = chart.children.push(
            am5.Legend.new(PartitionedBarChartRoot, {
                nameField: "name",
                fillField: "color",
                strokeField: "color",
                centerY: am5.p100,
                centerX: am5.p50,
                paddingTop: 20,
                y: am5.p100,
                x: am5.p50,
                layout: PartitionedBarChartRoot.gridLayout,
            })
        );
        legend.labels.template.setAll({ fontSize: 14, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        let data = [
            { group: "Mammals", animal: "Elephant", population: 41500 },
            { group: "Mammals", animal: "Lion", population: 20000 },
            { group: "Mammals", animal: "Tiger", population: 3900 },
            { group: "Mammals", animal: "Panda", population: 1864 },
            { group: "Mammals", animal: "Giraffe", population: 11700 },
            { group: "Mammals", animal: "Kangaroo", population: 50000 },
            { group: "Mammals", animal: "Wolf", population: 30000 },
            { group: "Mammals", animal: "Bear", population: 20000 },
            { group: "Birds", animal: "Eagle", population: 70000 },
            { group: "Birds", animal: "Penguin", population: 12000 },
            { group: "Birds", animal: "Parrot", population: 15000 },
            { group: "Birds", animal: "Ostrich", population: 20000 },
            { group: "Birds", animal: "Flamingo", population: 20000 },
            { group: "Reptiles", animal: "Crocodile", population: 20000 },
            { group: "Reptiles", animal: "Komodo Dragon", population: 6000 },
            { group: "Reptiles", animal: "Snake", population: 30000 },
            { group: "Reptiles", animal: "Turtle", population: 50000 },
            { group: "Fish", animal: "Clownfish", population: 20000 },
            { group: "Fish", animal: "Shark", population: 10000 },
            { group: "Fish", animal: "Salmon", population: 70000 },
            { group: "Fish", animal: "Tuna", population: 60000 },
            { group: "Amphibians", animal: "Frog", population: 50000 },
            { group: "Amphibians", animal: "Salamander", population: 70000 },
            { group: "Amphibians", animal: "Newt", population: 30000 }
        ];

        // Create axes
        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(PartitionedBarChartRoot, {
            categoryField: "animal",
            renderer: am5xy.AxisRendererY.new(PartitionedBarChartRoot, { minGridDistance: 10, minorGridEnabled: true, inversed: false }),
            tooltip: am5.Tooltip.new(PartitionedBarChartRoot, {})
        }));

        yAxis.get("renderer").grid.template.setAll({ "location": 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yAxis.get("renderer").labels.template.setAll({ fontSize: 12, location: 0.5, fill: mode == "light" ? am5.color(0x00000) : am5.color(0xffffff), })
        yAxis.data.setAll(data);

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(PartitionedBarChartRoot, {
            renderer: am5xy.AxisRendererX.new(PartitionedBarChartRoot, {}),
            tooltip: am5.Tooltip.new(PartitionedBarChartRoot, {})
        }));
        xAxis.get("renderer").labels.template.setAll({ fontSize: 12, location: 0.5, fill: mode == "light" ? am5.color(0x00000) : am5.color(0xffffff) })
        xAxis.get("renderer").grid.template.setAll({ stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        // Add series
        let series = chart.series.push(am5xy.ColumnSeries.new(PartitionedBarChartRoot, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "population",
            categoryYField: "animal",
            tooltip: am5.Tooltip.new(PartitionedBarChartRoot, {
                pointerOrientation: "horizontal"
            })
        }));

        series.columns.template.setAll({
            tooltipText: "{categoryY}: [bold]{valueX}[/]",
            width: am5.percent(90),
            strokeOpacity: 0
        });

        series.columns.template.adapters.add("fill", function (fill, target) {
            if (target.dataItem) {
                const dataContext = target.dataItem.dataContext as { group: string; animal: string; population: number };
                switch (dataContext.group) {
                    case "Mammals":
                        return colors.getIndex(0);
                        break;
                    case "Birds":
                        return colors.getIndex(2);
                        break;
                    case "Reptiles":
                        return colors.getIndex(4);
                        break;
                    case "Fish":
                        return colors.getIndex(6);
                        break;
                    case "Amphibians":
                        return colors.getIndex(8);
                        break;
                }
            }
            return fill;
        })

        series.data.setAll(data);

        function createRange(label: string, category: string, color: am5.Color | undefined) {
            let rangeDataItem = yAxis.makeDataItem({ category: category });

            let range = yAxis.createAxisRange(rangeDataItem);
            if (range && color !== undefined) {
                rangeDataItem.get("label")?.setAll({
                    fill: color,
                    text: label,
                    location: 1,
                    fontWeight: "bold",
                    dx: -130
                });

                rangeDataItem.get("grid")?.setAll({
                    stroke: color,
                    strokeOpacity: 1,
                    location: 1
                });

                rangeDataItem.get("tick")?.setAll({
                    stroke: color,
                    strokeOpacity: 1,
                    location: 1,
                    visible: true,
                    length: 130
                });

                legendData.push({ name: label, color: color });
            }
        }
        createRange("Amphibians", "Newt", colors.getIndex(8));
        createRange("Fish", "Tuna", colors.getIndex(6));
        createRange("Reptiles", "Turtle", colors.getIndex(4));
        createRange("Birds", "Flamingo", colors.getIndex(2));
        createRange("Mammals", "Bear", colors.getIndex(0));

        legend.data.setAll(legendData);

        // Add cursor
        let cursor = chart.set("cursor", am5xy.XYCursor.new(PartitionedBarChartRoot, { xAxis: xAxis, yAxis: yAxis }));

        // Make stuff animate on load
        chart.appear(1000, 100);

        // Exporting
        const exporting = am5plugins_exporting.Exporting.new(PartitionedBarChartRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(PartitionedBarChartRoot, { useDefaultCSS: false }),
            filePrefix: "Partitioned_Bar_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => PartitionedBarChartRoot && PartitionedBarChartRoot.dispose();
    }, [mode, t]);
    return (<div id="PartitionedBarChartDiv" style={{ width: "100%", height: "680px" }}></div>);
};
export default PartitionedBarChart;