
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

const LineAndLegendChart = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;

    useLayoutEffect(() => {
        const LineAndLegendRoot = am5.Root.new("LineAndLengendChartDiv");
        const colors = am5.ColorSet.new(LineAndLegendRoot, { colors: customColors.map(color => am5.color(color)) });

        const myTheme = am5.Theme.new(LineAndLegendRoot);
        myTheme.rule("AxisLabel", ["minor"]).setAll({ dy: 1 });
        myTheme.rule("Grid", ["x"]).setAll({ strokeOpacity: 0.05 });
        myTheme.rule("Grid", ["x", "minor"]).setAll({ strokeOpacity: 0.05 });

        // Set themes
        LineAndLegendRoot.setThemes([
            am5themes_Animated.new(LineAndLegendRoot),
            myTheme
        ]);

        // Create chart
        const chart = LineAndLegendRoot.container.children.push(am5xy.XYChart.new(LineAndLegendRoot, {
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


        let date = new Date();
        date.setHours(0, 0, 0, 0);
        let value = 100;

        let data: { date: number; FoodQuality: number; Service: number; Cleanliness: number; ValueForMoney: number; }[] = [];
        function generateData() {
            am5.time.add(date, "day", 1);
            return {
                date: date.getTime(),
                FoodQuality: Math.round((Math.random() * 10 - 4.2) + value),
                Service: Math.round((Math.random() * 10 - 4.2) + value),
                Cleanliness: Math.round((Math.random() * 10 - 4.2) + value),
                ValueForMoney: Math.round((Math.random() * 10 - 4.2) + value),
            };
        }

        function generateDatas(count: number) {
            let data = [];
            for (let i = 0; i < count; ++i) { data.push(generateData()); }
            return data;
        }

        // Create axes
        const xRenderer = am5xy.AxisRendererX.new(LineAndLegendRoot, { minGridDistance: 40, minorGridEnabled: true })
        xRenderer.grid.template.setAll({ location: 1 })
        xRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff), paddingTop: 20, oversizedBehavior: "wrap", });

        const xAxis = chart.xAxes.push(am5xy.DateAxis.new(LineAndLegendRoot, {
            maxDeviation: 0.2,
            baseInterval: { timeUnit: "day", count: 1 },
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(LineAndLegendRoot, {})
        }));

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(LineAndLegendRoot, {
            renderer: am5xy.AxisRendererY.new(LineAndLegendRoot, {})
        }));
        const yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        // Add series
        data = generateDatas(10)
        function createSeries(name: string, field: string, index: number) {
            const color = colors.getIndex(index);
            const series = chart.series.push(
                am5xy.LineSeries.new(LineAndLegendRoot, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: "date",
                    valueYField: field,
                    legendValueText: "{valueY}",
                    tooltip: am5.Tooltip.new(LineAndLegendRoot, {
                        pointerOrientation: "horizontal",
                        labelText: "{valueY}"
                    }),
                    stroke: color,
                })
            );

            series.data.setAll(data);
            // legend.data.push(series);
            // Make stuff animate on load
            series.appear();
            return series;
        }

        createSeries("Food Quality", "FoodQuality", 1);
        createSeries("Service", "Service", 2);
        createSeries("Cleanliness", "Cleanliness", 3);
        createSeries("Value for Money", "ValueForMoney", 4);

        // Add cursor
        const cursor = chart.set("cursor", am5xy.XYCursor.new(LineAndLegendRoot, { behavior: "none" }));
        cursor.lineY.set("visible", false);


        // Add legend
        const legend = chart.rightAxesContainer.children.push(am5.Legend.new(LineAndLegendRoot, {
            layout: LineAndLegendRoot.gridLayout,
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
        const exporting = am5plugins_exporting.Exporting.new(LineAndLegendRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(LineAndLegendRoot, {
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

        return () => LineAndLegendRoot && LineAndLegendRoot.dispose();
    }, [mode, t]);
    return (<div id="LineAndLengendChartDiv" data-theme={mode} style={{ width: "100%", height: "740px" }}></div>);
};
export default LineAndLegendChart;