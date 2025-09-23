'use client'
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';

//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

//data
interface chartDataType { category: string; sales: number; revenue: number; expenses: number; avgLine: number; forecastLine: number; }

const chartData: chartDataType[] = [{ category: "January", sales: 120, revenue: 200, expenses: 90, avgLine: 150, forecastLine: 160 }, { category: "February", sales: 150, revenue: 220, expenses: 100, avgLine: 160, forecastLine: 170 }, { category: "March", sales: 170, revenue: 250, expenses: 110, avgLine: 175, forecastLine: 180 }, { category: "April", sales: 140, revenue: 210, expenses: 95, avgLine: 160, forecastLine: 170 }, { category: "May", sales: 180, revenue: 260, expenses: 120, avgLine: 180, forecastLine: 190 }, { category: "June", sales: 200, revenue: 280, expenses: 130, avgLine: 190, forecastLine: 200 }, { category: "July", sales: 210, revenue: 300, expenses: 140, avgLine: 200, forecastLine: 210 }, { category: "August", sales: 190, revenue: 270, expenses: 125, avgLine: 185, forecastLine: 195 }, { category: "September", sales: 220, revenue: 310, expenses: 135, avgLine: 210, forecastLine: 220 }, { category: "October", sales: 250, revenue: 330, expenses: 150, avgLine: 230, forecastLine: 240 }, { category: "November", sales: 230, revenue: 310, expenses: 145, avgLine: 220, forecastLine: 230 }, { category: "December", sales: 260, revenue: 350, expenses: 160, avgLine: 250, forecastLine: 260 },];
const chartInfo = [{ seriesType: "Column", name: "Sales", legendText: "Sales", YField: "sales" }, { seriesType: "Column", name: "Revenue", legendText: "Revenue", YField: "revenue" }, { seriesType: "Column", name: "Expenses", legendText: "Expenses", YField: "expenses" }, { seriesType: "Line", name: "Average Line", legendText: "Average Line", YField: "avgLine" }, { seriesType: "Line", name: "Forecast Line", legendText: "Forecast Line", YField: "forecastLine" },]
const ColumnAndLineChart = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    useLayoutEffect(() => {
        const LACChartRoot = am5.Root.new("ColumnAndLineChartDiv");

        // Set themes
        const responsive = am5themes_Responsive.new(LACChartRoot);
        responsive.addRule({ name: "yRenderer1", relevant: am5themes_Responsive.maybeL.bind(am5themes_Responsive), settings: { inside: true } });
        responsive.addRule({ name: "yRenderer2", relevant: am5themes_Responsive.maybeL.bind(am5themes_Responsive), settings: { inside: true } });

        LACChartRoot.setThemes([am5themes_Animated.new(LACChartRoot), responsive]);

        // Create chart
        const chart = LACChartRoot.container.children.push(am5xy.XYChart.new(LACChartRoot, { layout: LACChartRoot.verticalLayout, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 40 }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Column and Line chart that shows GuestRevu Trend Analysis");

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);

        // Create axes
        const xRenderer = am5xy.AxisRendererX.new(LACChartRoot, { minGridDistance: 10 });
        xRenderer.labels.template.setAll({ oversizedBehavior: "wrap", textAlign: "center", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(LACChartRoot, { categoryField: "category", renderer: xRenderer }));
        xAxis.data.setAll(chartData);
        const yRenderer1 = am5xy.AxisRendererY.new(LACChartRoot, { minGridDistance: 25, opposite: false, });
        yRenderer1.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer1.grid.template.setAll({ stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        const yAxis1 = chart.yAxes.push(am5xy.ValueAxis.new(LACChartRoot, { min: 0, renderer: yRenderer1 }));
        yAxis1.children.unshift(am5.Label.new(LACChartRoot, {
            text: 'Money',
            rotation: -90,
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            position: "absolute",
            y: am5.percent(50),
            x: am5.percent(-15),
            centerY: am5.percent(50),
            paddingTop: 10,
            paddingBottom: 30,
            fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)
        }));

        // Add legend
        const legend = chart.children.push(am5.Legend.new(LACChartRoot, { centerX: am5.p50, x: am5.p50, y: am5.percent(100), centerY: am5.percent(100) }));

        legend.itemContainers.template.events.on("pointerover", function (e) {
            // As series list is data of a legend, dataContext is series
            const series = e.target?.dataItem?.dataContext;
            chart.series.each(function (chartSeries) { if (chartSeries != series) { void chartSeries.hide(); } else { void chartSeries.show(); } })
        });

        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on("pointerout", function () { chart.series.each(function (chartSeries) { void chartSeries.show(); }); });
        legend.labels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        legend.valueLabels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        const bulletShapes = [
            (root: am5.Root) => am5.Triangle.new(root, { width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (root: am5.Root) => am5.Star.new(root, { width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (root: am5.Root) => am5.Triangle.new(root, { rotation: 180, width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (root: am5.Root) => am5.Star.new(root, { spikes: 8, width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
        ];

        // Add series
        const createSeries = (seriesType: string, name: string, legendText: string, YField: string, bulletValue: number) => {
            const color = am5.color(theme.palette.customColors[bulletValue]);
            if (seriesType == "Column") {
                const series = chart.series.push(am5xy.ColumnSeries.new(LACChartRoot, {
                    name: name,
                    stacked: true,
                    xAxis: xAxis,
                    yAxis: yAxis1,
                    valueYField: YField,
                    categoryXField: "category",
                    tooltip: am5.Tooltip.new(LACChartRoot, { readerAnnounce: true, labelText: "{name} in {categoryX}: {valueY} {info}" }),
                    legendLabelText: legendText || "",
                    tooltipY: am5.percent(10),
                    fill: color,
                    stroke: color
                }));
                series.data.setAll(chartData);
                void series.appear(1000, 100);
                if (legendText) { legend.data.push(series); }
                return series;
            } else {
                const series = chart.series.push(am5xy.LineSeries.new(LACChartRoot, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis1,
                    sequencedInterpolation: true,
                    valueYField: YField,
                    categoryXField: "category",
                    tooltip: am5.Tooltip.new(LACChartRoot, { readerAnnounce: true, labelText: "{name} in {categoryX}: {valueY} {info}" }),
                    stroke: color,
                    width: 2,
                    fill: color,
                    legendLabelText: legendText || ""
                }));

                // series.bullets.push(function () {
                //     return am5.Bullet.new(LACChartRoot, {
                //         sprite: am5.Circle.new(LACChartRoot, {
                //             radius: 4,
                //             strokeWidth: 2,
                //             stroke: series.get("stroke"),
                //             fill: series.get("fill"),
                //             dy: series.get("name") === "Forecast Line" ? -3 : series.get("name") === "Average Line" ? 3 : 0
                //         })
                //     });
                // });
                // Add bullets with different shapes

                series.bullets.push(() => {
                    const shapeIndex = (bulletValue - 2) % bulletShapes.length;
                    if (bulletShapes[shapeIndex]) {
                        const shape = bulletShapes[shapeIndex](LACChartRoot);
                        shape.setAll({ "fill": series.get("fill") });
                        return am5.Bullet.new(LACChartRoot, { sprite: shape });
                    }
                });

                series.data.setAll(chartData);
                void series.appear(1000, 100);
                if (legendText) { legend.data.push(series); }
                return series;
            }
        }
        chartInfo.map((info, index) => { createSeries(info.seriesType, info.name, info.legendText, info.YField, index); });

        chart.set("cursor", am5xy.XYCursor.new(LACChartRoot, {}));

        // Make stuff animate on load
        void chart.appear(1000, 100);

        // Exporting
        const exporting = am5plugins_exporting.Exporting.new(LACChartRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(LACChartRoot, { useDefaultCSS: false }),
            filePrefix: "Column_And_Line_Chart",
            //title: "Review Rating Column Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        return () => LACChartRoot && LACChartRoot.dispose();
    }, [mode, theme.palette.customColors]);

    return (<div id="ColumnAndLineChartDiv" style={{ width: "100%", height: "740px" }}> </div>);
};
export default ColumnAndLineChart; 