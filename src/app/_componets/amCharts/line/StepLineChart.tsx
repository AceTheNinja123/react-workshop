
'use client'
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Box } from "@mui/material";

//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useTranslation } from "react-i18next";

const StepLineChart = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;

    useLayoutEffect(() => {
        const StepLineRoot = am5.Root.new("StepLineChartDiv");
        const colors = am5.ColorSet.new(StepLineRoot, { colors: customColors.map(color => am5.color(color)) });

        StepLineRoot.dateFormatter.setAll({
            dateFormat: "yyyy",
            dateFields: ["valueX"]
        });

        // Set themes
        StepLineRoot.setThemes([am5themes_Animated.new(StepLineRoot),]);

        // Create chart
        const chart = StepLineRoot.container.children.push(am5xy.XYChart.new(StepLineRoot, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            maxTooltipDistance: 0,
            pinchZoomX: true,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20
        }));

        // The data
        let stepData = [
            { "year": "2012", "roses": 600 },
            { "year": "2013", "roses": 600 },
            { "year": "2014", "roses": 600 },
            { "year": "2015", "roses": 720 },
            { "year": "2016", "roses": 720 },
            { "year": "2017", "roses": 720 },
            { "year": "2018", "roses": 820 },
            { "year": "2019", "roses": 820 },
            { "year": "2020", "roses": 900 },
            { "year": "2021", "roses": 900 },
            { "year": "2022", "roses": 900 },
            { "year": "2023", "roses": 950 }
        ];

        // Create axes
        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(StepLineRoot, {
            maxDeviation: 0.5,
            baseInterval: { timeUnit: "year", count: 1 },
            renderer: am5xy.AxisRendererX.new(StepLineRoot, { pan: "zoom", minorGridEnabled: true }),
            tooltip: am5.Tooltip.new(StepLineRoot, {})
        }));
        const xRenderer = xAxis.get("renderer");
        xRenderer.grid.template.setAll({ location: 1 })
        xRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff), paddingTop: 20, oversizedBehavior: "wrap", });
        xAxis.data.setAll(stepData);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(StepLineRoot, {
            maxDeviation: 1,
            renderer: am5xy.AxisRendererY.new(StepLineRoot, { pan: "zoom" })
        }));
        const yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        // Add series
        let series = chart.series.push(am5xy.StepLineSeries.new(StepLineRoot, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "year",
            tooltip: am5.Tooltip.new(StepLineRoot, {
                labelText: "{valueX}: {valueY}"
            })
        }));

        series.strokes.template.setAll({
            strokeWidth: 3
        });

        // Set up data processor to parse string dates
        // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
        series.data.processor = am5.DataProcessor.new(StepLineRoot, {
            dateFormat: "yyyy",
            dateFields: ["year"]
        });

        series.data.setAll(stepData);

        // Add cursor
        const cursor = chart.set("cursor", am5xy.XYCursor.new(StepLineRoot, { behavior: "none" }));
        cursor.lineY.set("visible", false);

        // Add legend
        const legend = chart.rightAxesContainer.children.push(am5.Legend.new(StepLineRoot, {
            layout: StepLineRoot.gridLayout,
            centerX: am5.percent(50),
            x: am5.percent(50),
            width: 200,
            paddingLeft: 15,
            height: am5.percent(100),
        }));

        // When legend item container is hovered, dim all the series except the hovered one
        legend.itemContainers.template.events.on("pointerover", function (e) {
            const itemContainer = e.target;

            // As series list is data of a legend, dataContext is series
            const series = itemContainer.dataItem?.dataContext;

            chart.series.each(function (chartSeries) {
                const lineSeries = chartSeries as am5xy.LineSeries;
                if (lineSeries !== series) { lineSeries.strokes.template.setAll({ strokeOpacity: 0.15, stroke: am5.color(0x000000) }); }
                else { lineSeries.strokes.template.setAll({ strokeWidth: 3 }); }
            });
        })

        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on("pointerout", function (e) {
            const itemContainer = e.target;
            const series = itemContainer.dataItem?.dataContext;

            chart.series.each(function (chartSeries) {
                const lineSeries = chartSeries as am5xy.LineSeries;
                lineSeries.strokes.template.setAll({
                    strokeOpacity: 1,
                    strokeWidth: 1,
                    stroke: chartSeries.get("fill")
                });
            });
        })

        legend.itemContainers.template.set("width", am5.p100);
        legend.valueLabels.template.setAll({ fontSize: 14, fontWeight: "bold", width: am5.p100, textAlign: "right", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        legend.labels.template.setAll({ fontSize: 14, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
        legend.data.setAll(chart.series.values);

        // Make stuff animate on load
        chart.appear(1000, 100);

        // Exporting
        const exporting = am5plugins_exporting.Exporting.new(StepLineRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(StepLineRoot, {
                useDefaultCSS: false,
                themeTags: [mode === "light" ? "light-export" : "dark-export"]
            }),
            filePrefix: "line_And_Legend_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false },
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => StepLineRoot && StepLineRoot.dispose();
    }, [mode, t]);
    return (<div id="StepLineChartDiv" data-theme={mode} style={{ width: "100%", height: "740px" }}></div>);
};
export default StepLineChart;