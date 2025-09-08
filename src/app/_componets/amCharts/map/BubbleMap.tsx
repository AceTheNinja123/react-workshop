"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { dataType, bubbleMapData } from "./mapData"
interface geometryType { "type": string; "coordinates": Array<Array<number>> }
interface dataContextType { "geometry": geometryType; "geometryType": string; "madeFromGeoData": boolean; "id": string; "name": string; }

export default function BubbleMapChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;

    const Title = "Total Response by Country";

    useLayoutEffect(() => {
        const rootBubble = am5.Root.new("bubbleMapChart");

        // Set themes
        rootBubble.setThemes([am5themes_Animated.new(rootBubble)]);

        // Create the map chart
        const chart = rootBubble.container.children.push(am5map.MapChart.new(rootBubble, { panX: "rotateX", panY: "rotateY", projection: am5map.geoMercator(), exportable: true, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Bubble Map chart that display " + Title);

        // Create series for background fill
        const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(rootBubble, {}));
        backgroundSeries.mapPolygons.template.setAll({ fill: rootBubble.interfaceColors.get("alternativeBackground"), fillOpacity: 0, strokeOpacity: 0 });
        backgroundSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

        // Create main polygon series for countries
        const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(rootBubble, { geoJSON: am5geodata_worldLow }));
        polygonSeries.mapPolygons.template.setAll({ fill: rootBubble.interfaceColors.get("secondaryButton"), fillOpacity: 0.8, strokeWidth: 0.5, stroke: rootBubble.interfaceColors.get("secondaryButtonHover") });

        const tooltipHTML = '<center><strong>{name}</strong></center><table><tr><td style="color:#036595 padding:0">Total Responses: </td><td style="padding:0;"><b> {value}</b></td></tr><tr><td style="color: #00a0dc padding:0">Review Rating: </td><td><b>{review_rating} %</b></td></tr><tr><td style="color:#7ec991 padding:0">Sentiment: </td><td style="padding:0;"><b>{sentiment}</b></td></tr><tr><td style="fill:#e55d5d padding:0">Net Promoter Score: </td><td style="padding:0"><b>{nps}</b></td></tr></table>'

        // Create polygon series for circles
        const circleTemplate: am5.Template<am5.Circle> = am5.Template.new({ tooltipHTML: tooltipHTML, ariaLabel: "Bubble for {name}" });

        const bubbleSeries = chart.series.push(am5map.MapPointSeries.new(rootBubble, { calculateAggregates: true, valueField: "value", polygonIdField: "id" }));
        bubbleSeries.bullets.push(function () {
            return am5.Bullet.new(rootBubble, {
                sprite: am5.Circle.new(rootBubble, {
                    radius: 10,
                    templateField: 'circleTemp'
                }, circleTemplate)
            });
        });
        bubbleSeries.set("heatRules", [{ target: circleTemplate, min: 3, max: 50, key: "radius", dataField: "value" }]);

        const colors = am5.ColorSet.new(rootBubble, { colors: customColors.map(color => am5.color(color)) });

        //Legend Settings
        const legend = chart.children.push(am5.Legend.new(rootBubble, { useDefaultMarker: true, nameField: "name", fillField: "color", opacity: 0.8, strokeField: "color", clickTarget: "marker", centerX: am5.percent(50), x: am5.percent(50), y: am5.percent(100), centerY: am5.percent(100), dy: -20, background: am5.RoundedRectangle.new(rootBubble, { fill: am5.color(0xffffff), fillOpacity: 0.2 }) }));

        //Hidding countrys
        type LegendDataItem = (typeof legend.dataItems)[0];

        legend.itemContainers.template.events.on("click", function (ev) {
            am5.array.each(polygonSeries.mapPolygons.values, function (mapPolygon) {
                const dataContext = mapPolygon.dataItem?.dataContext as dataContextType;
                const legendDataItem = ev.target.dataItem as LegendDataItem;

                if (legendDataItem && legendDataItem.dataContext) {
                    const legendDataContext = legendDataItem.dataContext as dataType;
                    if (dataContext.id === legendDataContext.id) {
                        if (mapPolygon.get("disabled")) {
                            mapPolygon.setAll({ disabled: false, interactive: true });
                            legendDataItem.get("itemContainer").set("disabled", false);
                        } else {
                            mapPolygon.setAll({ disabled: true, interactive: false });
                            legendDataItem.get("itemContainer").set("disabled", true);
                        }
                    }
                }
            });
        });

        //Show countries related to the legend when hover over
        legend.itemContainers.template.events.on("pointerover", function (ev) {
            am5.array.each(polygonSeries.mapPolygons.values, function (mapPolygon) {
                if (!mapPolygon.get("disabled")) {
                    const dataContext = mapPolygon.dataItem?.dataContext as dataContextType;
                    const legendDataItem = ev.target.dataItem as LegendDataItem;
                    if (legendDataItem) {
                        const legendDataContext = legendDataItem.dataContext as dataType;
                        if (dataContext.id === legendDataContext.id) { mapPolygon.setAll({ fillOpacity: 1, strokeWidth: 2, stroke: rootBubble.interfaceColors.get("secondaryButtonDown") }); }
                        else { mapPolygon.setAll({ fillOpacity: 0.8, strokeWidth: 0.7, stroke: rootBubble.interfaceColors.get("secondaryButtonHover") }); }
                    }
                }
            })
        });

        legend.itemContainers.template.events.on("pointerout", function (ev) {
            am5.array.each(polygonSeries.mapPolygons.values, function (mapPolygon) {
                if (!mapPolygon.get("disabled")) {
                    const legendDataItem = ev.target.dataItem;
                    if (legendDataItem) { mapPolygon.setAll({ fillOpacity: 0.8, strokeWidth: 0.7, stroke: rootBubble.interfaceColors.get("secondaryButtonHover") }); }
                }
            })
        });
        legend.data.setAll([{ name: "< 3", color: colors.getIndex(0), fillOpacity: 0.7 }, { name: "3 - 10", color: colors.getIndex(1), fillOpacity: 0.7 }, { name: "10 - 25", color: colors.getIndex(2), fillOpacity: 0.7 }, { name: "25 - 50", color: colors.getIndex(3), fillOpacity: 0.7 }, { name: "50 - 100", color: colors.getIndex(4), fillOpacity: 0.7 }, { name: "100 - 300", color: colors.getIndex(5), fillOpacity: 0.7 }, { name: "> 300", color: colors.getIndex(6), fillOpacity: 0.7 }]);

        for (let i = 0; i < bubbleMapData.length; i++) {
            if (bubbleMapData[i].value < 3) { bubbleMapData[i].circleTemp = { fill: colors.getIndex(0) }; }
            else if (bubbleMapData[i].value >= 3 && bubbleMapData[i].value <= 10) { bubbleMapData[i].circleTemp = { fill: colors.getIndex(1) }; }
            else if (bubbleMapData[i].value > 10 && bubbleMapData[i].value <= 25) { bubbleMapData[i].circleTemp = { fill: colors.getIndex(2) }; }
            else if (bubbleMapData[i].value > 25 && bubbleMapData[i].value <= 50) { bubbleMapData[i].circleTemp = { fill: colors.getIndex(3) }; }
            else if (bubbleMapData[i].value > 50 && bubbleMapData[i].value <= 100) { bubbleMapData[i].circleTemp = { fill: colors.getIndex(4) }; }
            else if (bubbleMapData[i].value > 100 && bubbleMapData[i].value <= 300) { bubbleMapData[i].circleTemp = { fill: colors.getIndex(5) }; }
            else if (bubbleMapData[i].value > 300) { bubbleMapData[i].circleTemp = { fill: colors.getIndex(6) }; }
        }
        bubbleSeries.data.setAll(bubbleMapData);

        // Add globe/map switch
        const cont = chart.children.push(am5.Container.new(rootBubble, { layout: rootBubble.horizontalLayout, x: 20, y: 40 }));

        cont.children.push(am5.Label.new(rootBubble, { centerY: am5.p50, text: "Map", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));

        const switchButton = cont.children.push(am5.Button.new(rootBubble, { themeTags: ["switch"], centerY: am5.p50, icon: am5.Circle.new(rootBubble, { themeTags: ["icon"] }) }));

        switchButton.on("active", function () {
            if (!switchButton.get("active")) {
                chart.set("projection", am5map.geoMercator());
                backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
            } else {
                chart.set("projection", am5map.geoOrthographic());
                backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
            }
        });

        cont.children.push(am5.Label.new(rootBubble, { centerY: am5.p50, text: "Globe", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));

        // Add zoom control
        const zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(rootBubble, { x: 30, centerX: am5.p0, y: 60, centerY: am5.p0 }));
        const homeButton = zoomControl.children.moveValue(am5.Button.new(rootBubble, { paddingTop: 10, paddingBottom: 10, icon: am5.Graphics.new(rootBubble, { svgPath: "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8", fill: am5.color(0xffffff) }) }), 0)

        // const title = chart.children.unshift(am5.Label.new(rootBubble, {
        //     text: "Total Response by Country",
        //     fontSize: 24,
        //     centerY: 30,
        //     textAlign: "center",
        //     width: am5.p100,
        //     paddingBottom: 50,
        //     fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)
        // }));

        homeButton.events.on("click", function () { chart.goHome(); })

        // Set clicking on "water" to zoom out
        chart.chartContainer.get("background")?.events.on("click", function () { chart.goHome(); })

        // Make stuff animate on load
        chart.appear(1000, 100);

        return () => rootBubble && rootBubble.dispose();
    }, [mode, customColors]);

    return (<><div id="bubbleMapChart" style={{ width: "100%", height: "650px" }}></div></>);
};