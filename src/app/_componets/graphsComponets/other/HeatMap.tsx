"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { heatMapData, type heatMapType } from './heatMapData';

export default function HeatMap() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;

    useLayoutEffect(() => {
        const heatMapRoot = am5.Root.new("HeatMapChart");
        const colors = am5.ColorSet.new(heatMapRoot, { colors: customColors.map(color => am5.color(color)) });

        // Set themes
        heatMapRoot.setThemes([am5themes_Animated.new(heatMapRoot)]);

        // Create chart
        const chart = heatMapRoot.container.children.push(am5radar.RadarChart.new(heatMapRoot, { innerRadius: am5.percent(30), panX: false, panY: false, wheelX: "none", wheelY: "none", paddingLeft: 0, layout: heatMapRoot.verticalLayout }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Heat Map chart");

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);

        // Create axes and their renderers
        const yRenderer = am5radar.AxisRendererRadial.new(heatMapRoot, { visible: false, axisAngle: 90, minGridDistance: 10, inversed: true });
        yRenderer.grid.template.set("visible", false);
        yRenderer.labels.template.setAll({ textType: "circular", textAlign: "center", radius: -8, fontSize: 12, location: 0.5, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(heatMapRoot, { maxDeviation: 0, renderer: yRenderer, categoryField: "weekday" }));

        const xRenderer = am5radar.AxisRendererCircular.new(heatMapRoot, { visible: false, minGridDistance: 30, minorGridEnabled: true });
        xRenderer.grid.template.set("visible", false);
        xRenderer.labels.template.setAll({ textType: "circular", radius: 10, fontSize: 12, location: 0.5, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(heatMapRoot, {
            renderer: xRenderer,
            categoryField: "hour"
        }));

        // Create series
        const series = chart.series.push(am5radar.RadarColumnSeries.new(heatMapRoot, {
            calculateAggregates: true,
            stroke: am5.color(0xffffff),
            clustered: false,
            xAxis: xAxis,
            yAxis: yAxis,
            categoryXField: "hour",
            categoryYField: "weekday",
            valueField: "value"
        }));

        series.columns.template.setAll({ tooltipText: "{categoryY} at {categoryX}: {value}", strokeOpacity: 1, strokeWidth: 2, width: am5.percent(100), height: am5.percent(100) });

        series.events.on("datavalidated", function () {
            heatLegend.set("startValue", series.getPrivate("valueHigh"));
            heatLegend.set("endValue", series.getPrivate("valueLow"));
        });

        // Set up heat rules
        series.set("heatRules", [{
            target: series.columns.template,
            min: colors.getIndex(6),
            max: colors.getIndex(9),
            dataField: "value",
            key: "fill"
        }]);

        // Add heat legend
        const heatLegend = chart.bottomAxesContainer.children.push(am5.HeatLegend.new(heatMapRoot, { orientation: "horizontal", endColor: colors.getIndex(6), startColor: colors.getIndex(9) }));
        heatLegend.startLabel.setAll({ fontSize: 12, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        heatLegend.endLabel.setAll({ fontSize: 12, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        series.data.setAll(heatMapData)

        // Auto-populate X and Y axis category data
        const weekdays: Array<string> = [];
        const hours: Array<string> = [];
        am5.array.each(heatMapData, function (row: heatMapType) {
            if (row["weekday"] && weekdays.indexOf(row["weekday"]) == -1) { weekdays.push(row["weekday"]); }
            if (row["hour"] && hours.indexOf(row["hour"]) == -1) { hours.push(row["hour"]); }
        });

        yAxis.data.setAll(weekdays.map(function (item: string) { return { weekday: item } }));
        xAxis.data.setAll(hours.map(function (item) { return { hour: item } }));

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(heatMapRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(heatMapRoot, { useDefaultCSS: false }),
            filePrefix: "Heat_Map_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => heatMapRoot && heatMapRoot.dispose();
    }, [mode, customColors]);

    return (<><div id="HeatMapChart" style={{ width: "100%", height: "650px" }}></div></>);
};