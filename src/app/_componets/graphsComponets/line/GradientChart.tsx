"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const data = [{ name: 'Likes', data: [{ date: '1/11/2000', value: 4 }, { date: '2/11/2000', value: 3 }, { date: '3/11/2000', value: 10 }, { date: '4/11/2000', value: 9 }, { date: '5/11/2000', value: 35 }, { date: '6/11/2000', value: 19 }, { date: '7/11/2000', value: 22 }, { date: '8/11/2000', value: 12 }, { date: '9/11/2000', value: 7 }, { date: '10/11/2000', value: 19 }, { date: '11/11/2000', value: 5 }, { date: '12/11/2000', value: 13 }, { date: '1/11/2001', value: 9 }, { date: '2/11/2001', value: 17 }, { date: '3/11/2001', value: 2 }, { date: '4/11/2001', value: 7 }, { date: '5/11/2001', value: 5 }, { date: '6/11/2001', value: 20 }] }];

export default function GradientChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;

    useLayoutEffect(() => {
        let gradientRoot = am5.Root.new("gradientchartdiv");
        let colors = am5.ColorSet.new(gradientRoot, { step: 2 });

        // Set themes
        gradientRoot.setThemes([am5themes_Animated.new(gradientRoot)]);

        // Create chart
        let chart = gradientRoot.container.children.push(am5xy.XYChart.new(gradientRoot, { panX: false, panY: false, layout: gradientRoot.verticalLayout, paddingBottom: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 50 }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A gradient chart");

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);
        let easing = am5.ease.linear;

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(gradientRoot, { minorGridEnabled: true, minGridDistance: 80 });
        xRenderer.labels.template.setAll({ oversizedBehavior: "wrap", rotation: -45, textAlign: "center", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(gradientRoot, { categoryField: 'date', maxDeviation: 0, renderer: xRenderer, tooltip: am5.Tooltip.new(gradientRoot, {}) }));

        let yRenderer = am5xy.AxisRendererY.new(gradientRoot, { strokeOpacity: 0.1, });
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(gradientRoot, { extraMax: 0.1, renderer: yRenderer }));

        // Add legend
        /*let legend = chart.children.push(am5.Legend.new(gradientRoot, {clickTarget:"none", dy: 20, centerX: am5.p50, x: am5.p50, centerY: am5.percent(100), y: am5.percent(100)}));
        legend.labels.template.setAll({fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)});
        legend.valueLabels.template.setAll({fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)});

        // When legend item container is hovered, make only that series show
        legend.itemContainers.template.events.on("pointerover", function(e) {
            let itemContainer = e.target;
            let series = itemContainer.dataItem.dataContext;
            chart.series.each(function(chartSeries) {
            let bullets = chartSeries.bullets;
                if (chartSeries != series) {chartSeries.hide();} 
                else {
                    chartSeries.strokes.template.setAll({strokeWidth: 3});
                    chartSeries.show();
                }
            })
        })
        
        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on("pointerout", function(e) {
            let itemContainer = e.target;
            let series = itemContainer.dataItem.dataContext;
            chart.series.each(function(chartSeries) {
                chartSeries.strokes.template.setAll({strokeOpacity: 1, strokeWidth: 1, stroke: chartSeries.get("fill")});
                chartSeries.show();
            });
        })*/

        const createSeries = (name: string, data: any[]) => {
            let color = colors.next();
            // Add series
            let series = chart.series.push(am5xy.SmoothedXLineSeries.new(gradientRoot, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "date",
                tooltip: am5.Tooltip.new(gradientRoot, { readerAnnounce: true, labelText: "[bold]{categoryX}[/]\n{name}: {valueY}" }),
                stroke: color,
                fill: color,
            }));

            series.strokes.template.setAll({ strokeWidth: 10 });
            series.data.setAll(data);
            //series.fills.template.setAll({visible: true, fillOpacity: 0.4});
            series.bullets.push(function () {
                return am5.Bullet.new(gradientRoot, {
                    locationY: 0,
                    sprite: am5.Circle.new(gradientRoot, {
                        radius: 8,
                        stroke: gradientRoot.interfaceColors.get("background"),
                        strokeWidth: 2,
                        fill: series.get("fill")
                    })
                });
            });

            series.appear(1000, 100);
            xAxis.data.setAll(data);

            return series;
        }
        if (data && data.length > 0) {
            data.forEach(function (item) {
                createSeries(item.name, item.data);
            });
            //setTimeout(() => {legend.data.setAll(chart.series.values);}, 100);
        }

        // Add cursor to the chart
        let cursor = chart.set("cursor", am5xy.XYCursor.new(gradientRoot, {}));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        // Make stuff animate on load
        chart.appear(1000, 100);
        //Exporting
        let exporting = am5plugins_exporting.Exporting.new(gradientRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(gradientRoot, {}),
            filePrefix: "Gradient_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { align: "center", pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false },
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => gradientRoot && gradientRoot.dispose();
    }, []);

    return (<div id={"gradientchartdiv"} style={{ width: "100%", height: "700px" }}></div>);
};