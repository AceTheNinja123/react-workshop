
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

const SmoothedStackedAreaChart = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;

    useLayoutEffect(() => {
        const SmoothedStackedAreaRoot = am5.Root.new("SmoothedStackedAreaChartDiv");
        const colors = am5.ColorSet.new(SmoothedStackedAreaRoot, { colors: customColors.map(color => am5.color(color)) });

        // Set themes
        SmoothedStackedAreaRoot.setThemes([am5themes_Animated.new(SmoothedStackedAreaRoot),]);

        // Create chart
        const chart = SmoothedStackedAreaRoot.container.children.push(am5xy.XYChart.new(SmoothedStackedAreaRoot, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            maxTooltipDistance: 0,
            pinchZoomX: false,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20
        }));

        // The data
        let data = [
            { "year": "2012", "roses": 620, "tulips": 340, "lilies": 280, "orchids": 190, "sunflowers": 210 },
            { "year": "2013", "roses": 640, "tulips": 355, "lilies": 295, "orchids": 205, "sunflowers": 220 },
            { "year": "2014", "roses": 665, "tulips": 370, "lilies": 310, "orchids": 220, "sunflowers": 240 },
            { "year": "2015", "roses": 690, "tulips": 385, "lilies": 330, "orchids": 240, "sunflowers": 250 },
            { "year": "2016", "roses": 710, "tulips": 400, "lilies": 345, "orchids": 255, "sunflowers": 265 },
            { "year": "2017", "roses": 735, "tulips": 420, "lilies": 360, "orchids": 270, "sunflowers": 280 },
            { "year": "2018", "roses": 760, "tulips": 440, "lilies": 375, "orchids": 285, "sunflowers": 300 },
            { "year": "2019", "roses": 780, "tulips": 460, "lilies": 390, "orchids": 300, "sunflowers": 320 },
            { "year": "2020", "roses": 800, "tulips": 480, "lilies": 405, "orchids": 320, "sunflowers": 340 },
            { "year": "2021", "roses": 820, "tulips": 500, "lilies": 420, "orchids": 340, "sunflowers": 355 },
            { "year": "2022", "roses": 850, "tulips": 525, "lilies": 440, "orchids": 360, "sunflowers": 370 },
            { "year": "2023", "roses": 870, "tulips": 540, "lilies": 460, "orchids": 380, "sunflowers": 390 }
        ];

        // Create axes
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(SmoothedStackedAreaRoot, {
            categoryField: "year",
            startLocation: 0.5,
            endLocation: 0.5,
            renderer: am5xy.AxisRendererX.new(SmoothedStackedAreaRoot, {
                minorGridEnabled: true,
                minGridDistance: 70
            }),
            tooltip: am5.Tooltip.new(SmoothedStackedAreaRoot, {})
        }));
        const xRenderer = xAxis.get("renderer");
        xRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        xRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff), paddingTop: 20, oversizedBehavior: "wrap", });
        xAxis.data.setAll(data);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(SmoothedStackedAreaRoot, {
            renderer: am5xy.AxisRendererY.new(SmoothedStackedAreaRoot, {})
        }));
        const yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer.grid.template.setAll({ stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        // Add series

        function createSeries(name: string, field: string, index: number) {
            let series = chart.series.push(am5xy.SmoothedXLineSeries.new(SmoothedStackedAreaRoot, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: field,
                categoryXField: "year",
                stacked: true,
                stroke: am5.color(0xffffff),
                fill: colors.getIndex(index),
                tooltip: am5.Tooltip.new(SmoothedStackedAreaRoot, {
                    pointerOrientation: "horizontal",
                    labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
                })
            }));

            series.strokes.template.setAll({
                strokeWidth: 4,
                strokeOpacity: 1,
                shadowBlur: 2,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: am5.color(0x000000),
                shadowOpacity: 0.1
            })

            series.fills.template.setAll({
                fillOpacity: 1,
                visible: true,

                fillPattern: am5.GrainPattern.new(SmoothedStackedAreaRoot, {
                    maxOpacity: 0.15,
                    density: 0.5,
                    colors: [am5.color(0x000000), am5.color(0x000000), am5.color(0xffffff)]
                })

            });

            series.data.setAll(data);
            series.appear(1000);
        }

        createSeries("Roses", "roses", 1);
        createSeries("Tulips", "tulips",3);
        createSeries("Lilies", "lilies", 5);
        createSeries("Orchids", "orchids", 7);
        createSeries("Sunflowers", "sunflowers", 9);

        // Add cursor
        const cursor = chart.set("cursor", am5xy.XYCursor.new(SmoothedStackedAreaRoot, { behavior: "none" }));
        cursor.lineY.set("visible", false);

        // Add legend
        const legend = chart.rightAxesContainer.children.push(am5.Legend.new(SmoothedStackedAreaRoot, {
            layout: SmoothedStackedAreaRoot.gridLayout,
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
        const exporting = am5plugins_exporting.Exporting.new(SmoothedStackedAreaRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(SmoothedStackedAreaRoot, {
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

        return () => SmoothedStackedAreaRoot && SmoothedStackedAreaRoot.dispose();
    }, [mode, t]);
    return (<div id="SmoothedStackedAreaChartDiv" data-theme={mode} style={{ width: "100%", height: "740px" }}></div>);
};
export default SmoothedStackedAreaChart;