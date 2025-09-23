"use client";
import React, { useLayoutEffect, } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
interface dataType { category: string; y: number; name: string; }

export default function DivergentStackedBarsChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;

    useLayoutEffect(() => {
        const DSBRoot = am5.Root.new("serviceRatingChartDiv");

        // Set themes
        DSBRoot.setThemes([am5themes_Animated.new(DSBRoot)]);

        // Create chart
        const chart = DSBRoot.container.children.push(am5xy.XYChart.new(DSBRoot, { panX: false, panY: false, wheelX: "none", wheelY: "none", layout: DSBRoot.verticalLayout, arrangeTooltips: true, paddingBottom: 30, paddingLeft: 20, paddingRight: 20, paddingTop: 30, }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Divergent Stacked Bars Chart");

        // Use only absolute numbers
        DSBRoot.numberFormatter.set("numberFormat", "#.#s'%");

        // Data
        const data = [
            { category: "Food Quality", negative1: -3, negative2: -8, neutral: 12, positive1: 60, positive2: 17 },
            { category: "Service Speed", negative1: -4, negative2: -10, neutral: 15, positive1: 55, positive2: 16 },
            { category: "Staff Friendliness", negative1: -2, negative2: -6, neutral: 10, positive1: 70, positive2: 18 },
            { category: "Cleanliness", negative1: -1, negative2: -5, neutral: 11, positive1: 75, positive2: 19 },
            { category: "Menu Variety", negative1: -3, negative2: -9, neutral: 13, positive1: 65, positive2: 14 },
            { category: "Ambience", negative1: -2, negative2: -7, neutral: 10, positive1: 68, positive2: 20 },
            { category: "Value for Money", negative1: -5, negative2: -12, neutral: 16, positive1: 52, positive2: 19 },
            { category: "Reservation Process", negative1: -2, negative2: -6, neutral: 14, positive1: 62, positive2: 18 },
            { category: "Wait Time", negative1: -6, negative2: -15, neutral: 18, positive1: 48, positive2: 19 },
            { category: "Overall Experience", negative1: -3, negative2: -9, neutral: 12, positive1: 70, positive2: 20 }
        ];

        // Create axes
        const yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(DSBRoot, {
                categoryField: "category",
                renderer: am5xy.AxisRendererY.new(DSBRoot, { inversed: true, cellStartLocation: 0.1, cellEndLocation: 0.9, minorGridEnabled: true })
            })
        );
        const yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer.grid.template.setAll({ stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        yAxis.data.setAll(data);

        const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(DSBRoot, { calculateTotals: true, min: -100, max: 100, strictMinMax: true, renderer: am5xy.AxisRendererX.new(DSBRoot, { minGridDistance: 50 }) }));
        const xRenderer = xAxis.get("renderer");
        xRenderer.axisFills.template.setAll({ fill: am5.color(0x000000), fillOpacity: 0.05, visible: true });
        xRenderer.grid.template.setAll({ stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        xRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff), oversizedBehavior: "wrap", textAlign: "center" });
        // Add series
        function createSeries(field: string, name: string, color: am5.Color | undefined) {
            const series = chart.series.push(
                am5xy.ColumnSeries.new(DSBRoot, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    name: name,
                    valueXField: field,
                    categoryYField: "category",
                    sequencedInterpolation: true,
                    stacked: true,
                    fill: color,
                    stroke: color,
                    calculateAggregates: true,
                })
            );
            series.columns.template.setAll({ height: am5.p100 });
            series.bullets.push(function (DSBRoot) {
                return am5.Bullet.new(DSBRoot, {
                    locationX: 0.5,
                    locationY: 0.5,
                    sprite: am5.Label.new(DSBRoot, {
                        fill: am5.color(0xffffff),
                        centerX: am5.p50,
                        centerY: am5.p50,
                        text: "{valueX}",
                        populateText: true,
                        oversizedBehavior: "hide"
                    })
                });
            });
            series.data.setAll(data);
            series.appear();

            return series;
        }

        const positiveColor = am5.color(theme.palette.success.main);
        const negativeColor = am5.color(theme.palette.error.main);

        createSeries("negative1", "Unlikely", am5.Color.lighten(negativeColor, 0.5));
        createSeries("negative2", "Never", negativeColor);
        createSeries("neutral", "Neutral", am5.color(0xC0C0C0));
        createSeries("positive1", "Sometimes", am5.Color.lighten(positiveColor, 0.5));
        createSeries("positive2", "Very often", positiveColor);

        // Add cursor to the chart
        const cursor = chart.set("cursor", am5xy.XYCursor.new(DSBRoot, {}));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        // Add legend
        const legend = chart.children.push(am5.Legend.new(DSBRoot, { nameField: "name", fillField: "color", strokeField: "color", centerX: am5.p50, x: am5.p50, marginTop: 20 }));
        legend.labels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        legend.valueLabels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        // Set the custom order for the legend items
        const legendItems = [{ name: "Never", color: negativeColor }, { name: "Unlikely", color: am5.Color.lighten(negativeColor, 0.5) }, { name: "Neutral", color: am5.color(0xC0C0C0) }, { name: "Sometimes", color: am5.Color.lighten(positiveColor, 0.5) }, { name: "Very often", color: positiveColor }];

        // When legend item container is hovered, make only that series show
        legend.itemContainers.template.events.on("pointerover", function (e) {
            const itemContainer = e.target;
            // As series list is data of a legend, dataContext is series
            const series = itemContainer.dataItem?.dataContext as dataType;
            chart.series.each(function (chartSeries) {
                if (chartSeries.get("name") !== series.name) { chartSeries.hide(); }
                else { chartSeries.show(); }
            });
            legend.itemContainers.each(function (itemContainer) {
                const legendseries = itemContainer.dataItem?.dataContext;
                if (legendseries != series) { itemContainer.set("opacity", 0.5); }
                else { itemContainer.set("opacity", 1); }
            });
        });

        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on("pointerout", function () {
            chart.series.each(function (chartSeries) { chartSeries.show(); });
            legend.itemContainers.each(function (itemContainer) { itemContainer.set("opacity", 1); });
        });

        legend.data.setAll(legendItems);

        const tooltip = am5.Tooltip.new(DSBRoot, {});
        tooltip.get("background")!.setAll({ fill: am5.color(0xe5e5e5), fillOpacity: 0.8, stroke: am5.color(0x000000), strokeOpacity: 0.8 });

        chart.plotContainer.set("tooltipPosition", "pointer");
        chart.plotContainer.set("tooltipText", "a");
        chart.plotContainer.set("tooltip", tooltip);

        tooltip.label.adapters.add("text", function (text,) {
            text = "";
            let heading = "";
            let i = 0;
            let maxLabelLength = 0;

            // Determine the maximum width for series name and legend label text
            chart.series.each(function (series) {
                const labelText = series.get("name");
                if (labelText && labelText?.length > maxLabelLength) { maxLabelLength = labelText.length; }
            });

            // AmCharts number formatter for percentages
            const numberFormatter = DSBRoot.numberFormatter;

            chart.series.each(function (series,) {
                const tooltipDataItem = series.get("tooltipDataItem");
                if (tooltipDataItem) {
                    if (i != 0) { text += "\n"; }
                    //Setting heading and text for the tooltip
                    heading = '[bold width:100px fontSize: "1.05rem"]' + tooltipDataItem.get("categoryY") + '[/]';

                    // Get the valueX and format it as a percentage
                    const valueX = tooltipDataItem.get("valueX") || 0;
                    const formattedValue = numberFormatter.format(valueX, "#.#'%'");  // Formats valueX as a percentage

                    text += '[' + series.get("fill") + 'bold width:' + (maxLabelLength * 10) + ']' + series.get("name") + '[/]' + formattedValue;
                }
                i++;
            });
            const Tooltip = heading + '\n' + text
            return Tooltip
        });

        // Make stuff animate on load
        chart.appear(1000, 100);

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(DSBRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(DSBRoot, { useDefaultCSS: false }),
            filePrefix: "Divergent_Stacked_Bars_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => DSBRoot && DSBRoot.dispose();
    }, [mode, theme.palette.error.main, theme.palette.success.main]);

    return (<><div id="serviceRatingChartDiv" style={{ width: "100%", height: "650px" }}></div></>);
};