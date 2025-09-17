"use client";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function CandlestickChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;

    function generateChartData() {
        let chartData = [];
        let firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 2000);
        firstDate.setHours(0, 0, 0, 0);
        let value = 1200;
        for (let i = 0; i < 100; i++) {
            let newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);

            value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            let open = value + Math.round(Math.random() * 16 - 8);
            let low = Math.min(value, open) - Math.round(Math.random() * 5);
            let high = Math.max(value, open) + Math.round(Math.random() * 5);

            chartData.push({ date: newDate.getTime(), value: value, open: open, low: low, high: high });
        }
        return chartData;
    }

    let data = generateChartData();

    useLayoutEffect(() => {
        let candlestickRoot = am5.Root.new("CandlestickChartDiv");

        // Set themes
        candlestickRoot.setThemes([am5themes_Animated.new(candlestickRoot)]);

        // Create chart
        let chart = candlestickRoot.container.children.push(am5xy.XYChart.new(candlestickRoot, { panX: false, panY: false, layout: candlestickRoot.verticalLayout, paddingBottom: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 50 }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A candlestick chart");

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(candlestickRoot, { minorGridEnabled: true, minGridDistance: 80 });
        xRenderer.labels.template.setAll({ oversizedBehavior: "wrap", textAlign: "center", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(candlestickRoot, { baseInterval: { timeUnit: "day", count: 1 }, groupData: true, maxDeviation: 0.5, renderer: xRenderer }));

        let yRenderer = am5xy.AxisRendererY.new(candlestickRoot, { strokeOpacity: 0.1, });
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)  })
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(candlestickRoot, { extraMax: 0.1, renderer: yRenderer }));

        let color = candlestickRoot.interfaceColors.get("background");

        // Add series
        let series = chart.series.push(
            am5xy.CandlestickSeries.new(candlestickRoot, {
                fill: color,
                calculateAggregates: true,
                stroke: color,
                name: "MDXI",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                openValueYField: "open",
                lowValueYField: "low",
                highValueYField: "high",
                valueXField: "date",
                lowValueYGrouped: "low",
                highValueYGrouped: "high",
                openValueYGrouped: "open",
                valueYGrouped: "close",
                legendValueText: "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}",
                legendRangeValueText: "{valueYClose}",
                tooltip: am5.Tooltip.new(candlestickRoot, { pointerOrientation: "horizontal", labelText: "[bold]{valueX.formatDate('dd MMM')}[/]\nopen: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY}" })
            })
        );

        // Stack axes vertically
        chart.leftAxesContainer.set("layout", candlestickRoot.verticalLayout);

        // Add cursor to the chart
        let cursor = chart.set("cursor", am5xy.XYCursor.new(candlestickRoot, { xAxis: xAxis }));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        // Add legend to the chart container (not axisHeader)
        let legend = chart.children.push(
            am5.Legend.new(candlestickRoot, {
                useDefaultMarker: true,
                x: am5.percent(5),
                y: am5.percent(-5),
                centerX: am5.percent(0),
                centerY: am5.percent(0),
                layout: candlestickRoot.horizontalLayout
            })
        );

        // transparent background (no white pill)
        legend.get("background")?.setAll({
            fillOpacity: 0,
            strokeOpacity: 0
        });

        // labels
        legend.labels.template.setAll({
            fontSize: 16,
            fontWeight: "bold",
            fill: mode === "light" ? am5.color(0x000000) : am5.color(0xffffff)
        });

        legend.valueLabels.template.setAll({
            fontSize: 16,
            fontWeight: "bold",
            fill: mode === "light" ? am5.color(0x000000) : am5.color(0xffffff)
        });

        // markers
        legend.markers.template.setAll({ width: 10 });
        legend.markerRectangles.template.setAll({
            cornerRadiusTR: 0,
            cornerRadiusBR: 0,
            cornerRadiusTL: 0,
            cornerRadiusBL: 0
        });

        // push series into legend
        legend.data.push(series);


        // set data
        series.data.setAll(data);

        // Make stuff animate on load
        series.appear(1000);
        chart.appear(1000, 100);

        //Exporting
        let exporting = am5plugins_exporting.Exporting.new(candlestickRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(candlestickRoot, {}),
            filePrefix: "Gradient_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { align: "center", pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false },
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => candlestickRoot && candlestickRoot.dispose();
    }, [data]);

    return (<><div id={"CandlestickChartDiv"} style={{ width: "100%", height: "700px" }}></div></>);
};