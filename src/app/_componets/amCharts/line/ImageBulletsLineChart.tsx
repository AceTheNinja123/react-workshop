"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
//amCharts5
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
//Images
import godzilla from './img/monsters/godzilla.png';
import hydra from './img/monsters/hydra.png';
import kraken from './img/monsters/kraken.png';
import minotaur from './img/monsters/minotaur.png';
import dragon from './img/monsters/dragon.png';
//data
import { dataType, imageType, monsterData } from "./ImageBulletsLineChartData"

export default function ImageBulletsLineChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    useLayoutEffect(() => {
        let IBLChartRoot = am5.Root.new("ImageBulletsLineChartdiv");
        let colors = am5.ColorSet.new(IBLChartRoot, {});
        let tooltipHTML = '<center><strong>Date: {categoryX}</center><table><table><tr><td style="color:{series.color};padding:0"><span style="color:{series.color}">{name}: </span></td><td style="padding:0"><b>{valueY} {info}</b></td></tr></table>'

        // Set themes
        IBLChartRoot.setThemes([am5themes_Animated.new(IBLChartRoot)]);

        // Create chart
        let chart = IBLChartRoot.container.children.push(am5xy.XYChart.new(IBLChartRoot, { panX: false, panY: false, layout: IBLChartRoot.verticalLayout, paddingBottom: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 50 }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Column chart that shows Overall Rating Source");

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);
        let easing = am5.ease.linear;

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(IBLChartRoot, { minorGridEnabled: true, minGridDistance: 30 });
        xRenderer.labels.template.setAll({ oversizedBehavior: "wrap", rotation: -45, textAlign: "center", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(IBLChartRoot, { categoryField: 'date', maxDeviation: 0, renderer: xRenderer, }));

        let yRenderer = am5xy.AxisRendererY.new(IBLChartRoot, { strokeOpacity: 0.1, });
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(IBLChartRoot, { extraMax: 0.05, min: 0, max: 100, strictMinMax: true, numberFormat: "#'%'", renderer: yRenderer }));

        yAxis.children.unshift(am5.Label.new(IBLChartRoot, {
            text: "Monsters",
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
        let legend = chart.children.push(am5.Legend.new(IBLChartRoot, { clickTarget: "none", dy: 20, centerX: am5.p50, x: am5.p50, y: am5.percent(100), useDefaultMarker: true, centerY: am5.percent(100), layout: IBLChartRoot.horizontalLayout }));
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

        const createSeries = (Legendname: string, data: Array<dataType>, image: imageType, colorIndex: number) => {
            // Add series
            let series = chart.series.push(am5xy.LineSeries.new(IBLChartRoot, {
                name: Legendname,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "date",
                sequencedInterpolation: true,
                tooltip: am5.Tooltip.new(IBLChartRoot, { readerAnnounce: true, labelText: "{name} in {categoryX}: {valueY}" }),
                stroke: colors.getIndex(colorIndex),
                fill: colors.getIndex(colorIndex),
                legendLabelText: Legendname || "",
            }));

            series.strokes.template.setAll({ strokeWidth: 5 });
            series.data.setAll(data);
            xAxis.data.setAll(data);
            series.bullets.push(function () {
                let container = am5.Container.new(IBLChartRoot, { centerX: am5.p50, centerY: am5.p50 });
                container.children.push(am5.Picture.new(IBLChartRoot, { centerX: am5.p50, centerY: am5.p50, width: 50, height: 50, src: image.src }));
                let circle = am5.Circle.new(IBLChartRoot, { centerX: am5.p50, centerY: am5.p50, radius: 35, stroke: series.get("fill"), fill: am5.color("#FFFFFF"), strokeWidth: 2 });
                container.set("mask", circle)
                return am5.Bullet.new(IBLChartRoot, { sprite: container });
            });

            if (Legendname) { legend.data.push(series); }
            let legendDataItem = legend.dataItems[legend.dataItems.length - 1];
            let marker = legendDataItem.get("marker");
            marker.children.push(am5.Picture.new(IBLChartRoot, {
                width: 30,
                height: 30,
                src: image.src,
                centerY: am5.p50,
                centerX: am5.p50,
                position: "relative",
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 8, // small right margin for spacing from text
                marginTop: 8
            }));
            legendDataItem.get("markerRectangle").set("forceHidden", true);

            return series;
        }
        let colorIndex = [9, 12, 0, 17, 41];
        let images = [godzilla, hydra, kraken, minotaur, dragon]
        monsterData.forEach(function (item, index) {
            createSeries(item.name, item.data, images[index], colorIndex[index])
        });

        // Add cursor to the chart
        let cursor = chart.set("cursor", am5xy.XYCursor.new(IBLChartRoot, {}));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        // Make stuff animate on load
        chart.appear(1000, 100);

        //Exporting
        let exporting = am5plugins_exporting.Exporting.new(IBLChartRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(IBLChartRoot, { useDefaultCSS: false }),
            filePrefix: "Overall_Trend_Chart",
            //title: "Review Rating Column Chart", 
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => IBLChartRoot && IBLChartRoot.dispose();
    }, []);

    return (<><div id="ImageBulletsLineChartdiv" style={{ width: "100%", height: "700px" }}></div></>);
};