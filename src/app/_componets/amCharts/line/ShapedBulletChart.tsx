"use client";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Grid } from "@mui/material";
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5index from "@amcharts/amcharts5/index";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useTranslation } from "react-i18next";

interface HobbyData { age: string; gaming: number; reading: number; traveling: number; sports: number; cooking: number; }

const hobbyData: HobbyData[] = [
    { age: "10-19", gaming: 90, reading: 55, traveling: 40, sports: 75, cooking: 30, },
    { age: "20-29", gaming: 80, reading: 60, traveling: 70, sports: 65, cooking: 50, },
    { age: "30-39", gaming: 60, reading: 70, traveling: 80, sports: 55, cooking: 65, },
    { age: "40-49", gaming: 40, reading: 75, traveling: 85, sports: 45, cooking: 75, },
    { age: "50-59", gaming: 25, reading: 80, traveling: 70, sports: 30, cooking: 85, },
    { age: "60+", gaming: 10, reading: 85, traveling: 60, sports: 20, cooking: 90, },
];


export default function ShapedBulletChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    let Title = "Hoobbies through the ages";

    useLayoutEffect(() => {
        let ShapedBulletChartRoot = am5.Root.new("ShapedBulletChartDiv");
        let colors = am5.ColorSet.new(ShapedBulletChartRoot, { step: 2 });

        // Set themes
        ShapedBulletChartRoot.setThemes([am5themes_Animated.new(ShapedBulletChartRoot)]);

        // Create chart
        let chart = ShapedBulletChartRoot.container.children.push(am5xy.XYChart.new(ShapedBulletChartRoot, { panX: false, panY: false, layout: ShapedBulletChartRoot.verticalLayout, paddingBottom: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 50 }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Shaped Bullet Chart Div ");

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);
        let easing = am5.ease.linear;

        let title = chart.children.unshift(am5.Label.new(ShapedBulletChartRoot, { text: Title, fontSize: 24, centerY: 30, textAlign: "center", width: am5.p100, paddingBottom: 50, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(ShapedBulletChartRoot, { minorGridEnabled: true, minGridDistance: 30 });
        xRenderer.labels.template.setAll({ oversizedBehavior: "wrap", rotation: -45, textAlign: "center", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ShapedBulletChartRoot, { categoryField: 'age', maxDeviation: 0, renderer: xRenderer }));

        let yRenderer = am5xy.AxisRendererY.new(ShapedBulletChartRoot, { strokeOpacity: 0.1, });
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ShapedBulletChartRoot, { extraMax: 0.1, renderer: yRenderer }));

        yAxis.children.unshift(am5.Label.new(ShapedBulletChartRoot, {
            text: "Hobbies",
            rotation: -90,
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            position: "absolute",
            y: am5.percent(50),
            x: am5.percent(-20),
            centerY: am5.percent(50),
            paddingTop: 10,
            paddingBottom: 20,
            fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)
        }));

        // Add legend
        let legend = chart.children.push(am5.Legend.new(ShapedBulletChartRoot, { clickTarget: "none", dy: 20, centerX: am5.p50, x: am5.p50, centerY: am5.percent(100), y: am5.percent(100) }));
        legend.labels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        legend.valueLabels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        // When legend item container is hovered, make only that series show
        legend.itemContainers.template.events.on("pointerover", function (e) {
            let itemContainer = e.target;
            let series = itemContainer.dataItem?.dataContext;
            chart.series.each(function (chartSeries) {
                let bullets = chartSeries.bullets;
                if (chartSeries != series) { chartSeries.hide(); }
                else {
                    if (chartSeries instanceof am5xy.SmoothedXLineSeries) chartSeries.strokes.template.setAll({ strokeWidth: 3 });
                    chartSeries.show();
                }
            })
        })

        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on("pointerout", function (e) {
            let itemContainer = e.target;
            let series = itemContainer.dataItem?.dataContext;
            chart.series.each(function (chartSeries) {
                if (chartSeries instanceof am5xy.SmoothedXLineSeries) chartSeries.strokes.template.setAll({ strokeOpacity: 1, strokeWidth: 1, stroke: chartSeries.get("fill") });
                chartSeries.show();
            });
        })

        const bulletShapes = [
            (ShapedBulletChartRoot: am5.Root) => am5.Circle.new(ShapedBulletChartRoot, { radius: 7.5, centerX: am5.p50, centerY: am5.p50 }),
            (ShapedBulletChartRoot: am5.Root) => am5.Triangle.new(ShapedBulletChartRoot, { width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (ShapedBulletChartRoot: am5.Root) => am5.Rectangle.new(ShapedBulletChartRoot, { width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (ShapedBulletChartRoot: am5.Root) => am5.Star.new(ShapedBulletChartRoot, { width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (ShapedBulletChartRoot: am5.Root) => am5.Rectangle.new(ShapedBulletChartRoot, { width: 10, height: 20, centerX: am5.p50, centerY: am5.p50 }),
            (ShapedBulletChartRoot: am5.Root) => am5.Triangle.new(ShapedBulletChartRoot, { rotation: 180, width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (ShapedBulletChartRoot: am5.Root) => am5.Rectangle.new(ShapedBulletChartRoot, { rotation: 45, width: 15, height: 15, centerX: am5.p50, centerY: am5.p50 }),
            (ShapedBulletChartRoot: am5.Root) => am5.Star.new(ShapedBulletChartRoot, { width: 15, height: 15, spikes: 8, centerX: am5.p50, centerY: am5.p50 }),
            // Add more shapes as needed
        ];

        const createSeries = (data: HobbyData[], legendText: string, field: string, bulletValue: number) => {
            let color = colors.next();
            // Add series
            let series = chart.series.push(am5xy.LineSeries.new(ShapedBulletChartRoot, {
                name: legendText,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: field,
                categoryXField: "age",
                //tooltip: am5.Tooltip.new(ShapedBulletChartRoot, {readerAnnounce: true, labelText: "{name} in {categoryX}: {valueY}"}),
                stroke: color,
                fill: color,
                legendLabelText: legendText || "",
            }));

            series.strokes.template.setAll({ strokeWidth: 3 });
            // Add an ariaLabel for screen readers
            series.data.setAll(data);

            // Add bullets with different shapes
            series.bullets.push((root, series, dataItem) => {
                const shapeIndex = bulletValue % bulletShapes.length; // Wrap around using modulus
                const bulletShape = bulletShapes[shapeIndex](root);
                bulletShape.setAll({ fill: series.get("fill") })
                return am5.Bullet.new(root, { sprite: bulletShape });
            });

            series.appear(1000, 100);
            if (legendText) {legend.data.push(series);}
            title.hide();
            xAxis.data.setAll(data);

            return series;
        }

        createSeries(hobbyData, "Gaming", "gaming", 0)
        createSeries(hobbyData, "Reading", "reading", 1)
        createSeries(hobbyData, "Traveling", "traveling", 2)
        createSeries(hobbyData, "Sports", "sports", 3)
        createSeries(hobbyData, "Cooking", "cooking", 4)

        let tooltip = am5.Tooltip.new(ShapedBulletChartRoot, {});
        tooltip.get("background")?.setAll({ fill: am5.color(0xe5e5e5), fillOpacity: 0.8, stroke: am5.color(0x000000), strokeOpacity: 0.8 });

        chart.plotContainer.set("tooltipPosition", "pointer");
        chart.plotContainer.set("tooltipText", "a");
        chart.plotContainer.set("tooltip", tooltip);

        const bulletSymbols = ['●', '▲', '■', '🟊', '▮', '▼', '◆'];

        tooltip.label.adapters.add("text", function (text, target) {
            text = "";
            let heading = "";
            let i = 0;
            let bulletSymbolsIndex = 0;
            let maxLabelLength = 0;

            // Determine the maximum width for series name and legend label text
            chart.series.each(function (series) {
                let labelText = series.get("legendLabelText");
                if (labelText && labelText.length > maxLabelLength) { maxLabelLength = labelText.length; }
            });

            chart.series.each(function (series) {
                let tooltipDataItem = series.get("tooltipDataItem");
                let labelText = series.get("legendLabelText");
                if (tooltipDataItem) {
                    if (i != 0) { text += "\n"; }
                    let bulletSymbol = "■";
                    // Check the type of bullet and set the corresponding symbol
                    if (series instanceof am5xy.LineSeries) {
                        if (bulletSymbolsIndex < bulletSymbols.length) {
                            bulletSymbol = bulletSymbols[bulletSymbolsIndex];
                            bulletSymbolsIndex++;
                        } else {
                            bulletSymbolsIndex = 0;
                            bulletSymbol = bulletSymbols[bulletSymbolsIndex];
                            bulletSymbolsIndex++;
                        }
                    };
                    let tooltipValueY = tooltipDataItem.get("valueY");
                    //Setting heading and text for the tooltip
                    heading = '[bold width:100px fontSize: "1.05rem"]' + tooltipDataItem.get("categoryX") + '[/]';
                    if ((labelText == 'Yes') || (labelText == 'No')) {
                        //text += '[' + series.get("fill") + 'width:15px ]' + bulletSymbol + '[/][bold]|[/][' + series.get("fill") + 'bold width:' + (maxLabelLength*15) + ']' + series.get("legendLabelText")  + '[/][bold width:10px ]|[/]' + tooltipValueY;
                        text += '[center' + series.get("fill") + 'width:15px ]' + bulletSymbol + '[/][bold width:10px ]|[/][bold width:' + (maxLabelLength * 15) + ']' + series.get("legendLabelText") + '[/][bold width:10px ]|[/]' + tooltipValueY;
                    } else {
                        //text += '[' + series.get("fill") + 'width:15px ]' + bulletSymbol + '[/][bold]|[/][' + series.get("fill") + 'bold width:' + (maxLabelLength*8) + ']' + series.get("legendLabelText")  + '[/][bold width:10px ]|[/]' + tooltipValueY;
                        text += '[center' + series.get("fill") + 'width:15px ]' + bulletSymbol + '[/][bold width:10px ]|[/][bold width:' + (maxLabelLength * 8) + ']' + series.get("legendLabelText") + '[/][bold width:10px ]|[/]' + tooltipValueY;
                    }
                }
                i++;
            });
            let Tooltip = heading + '\n' + text
            return Tooltip
        });

        // Add cursor to the chart
        let cursor = chart.set("cursor", am5xy.XYCursor.new(ShapedBulletChartRoot, {}));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        // Make stuff animate on load
        chart.appear(1000, 100);
        //Exporting
        let exporting = am5plugins_exporting.Exporting.new(ShapedBulletChartRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(ShapedBulletChartRoot, {}),
            filePrefix: "Shaped_Bullet_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { align: "center", pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false },
        });

        exporting.events.on("exportstarted", function () { title.show(); });
        exporting.events.on("exportfinished", function () { title.hide(); });

        return () => ShapedBulletChartRoot && ShapedBulletChartRoot.dispose();
    }, [mode]);

    return (<><div id="ShapedBulletChartDiv" style={{ width: "100%", height: "700px" }}></div></>);
};