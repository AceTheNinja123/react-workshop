"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
interface dataType { "name": string; "value": number; "color": string; "polarities": string; }
import { data } from "./SunburstFlavorWheelData"

export default function SunburstFlavorWheel() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;
    useLayoutEffect(() => {
        /**
         * This chart is inspired by:
         * https://coffee-mind.com/product/coffeemind-aroma-wheel/
         */

        // Create root element
        let SunburstFlavorWheelRoot = am5.Root.new("SunburstFlavorWheelchartdiv");

        // Set themes
        SunburstFlavorWheelRoot.setThemes([am5themes_Animated.new(SunburstFlavorWheelRoot)]);

        let container = SunburstFlavorWheelRoot.container.children.push(
            am5.ZoomableContainer.new(SunburstFlavorWheelRoot, {
                width: am5.p100,
                height: am5.p100,
                wheelable: true,
                pinchZoom: true
            })
        );

        let zoomTools = container.children.push(am5.ZoomTools.new(SunburstFlavorWheelRoot, { target: container }));

        // Add title
        let title = container.contents.children.push(am5.Label.new(SunburstFlavorWheelRoot, {
            text: "COFFEE\n[#63bdc5]AROMA[/]\n[#63bdc5]WHEEL[/]",
            textAlign: "center",
            x: am5.p50,
            y: am5.p50,
            centerX: am5.p50,
            centerY: am5.p50,
            fontSize: 25,
            fontWeight: "500",
            fill: am5.color(0x385d63)
        }));

        let credits = container.children.push(am5.Label.new(SunburstFlavorWheelRoot, {
            text: "Inspired by\n[bold]CoffeeMind",
            x: am5.p100,
            y: 0,
            centerX: am5.p100,
            centerY: 0,
            fontSize: 15,
            fill: am5.color(0x385d63),
            cursorOverStyle: "pointer",
            background: am5.Rectangle.new(SunburstFlavorWheelRoot, {
                fill: am5.color(0x000000),
                fillOpacity: 0
            })
        }));

        credits.events.on("click", function () { window.open("https://coffee-mind.com/product/coffeemind-aroma-wheel/"); });

        // Create series
        let series = container.contents.children.push(am5hierarchy.Sunburst.new(SunburstFlavorWheelRoot, {
            singleBranchOnly: true,
            downDepth: 2,
            initialDepth: 2,
            topDepth: 1,
            innerRadius: 100,
            valueField: "value",
            categoryField: "name",
            childDataField: "children"
        }));

        series.nodes.template.setAll({ tooltipText: "{category}" });
        series.slices.template.setAll({ templateField: "nodeSettings" });
        series.labels.template.setAll({
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            baseRadius: am5.p100,
            centerX: am5.p100,
            textAlign: "start"
        });

        series.data.setAll(data);
        series.set("selectedDataItem", series.dataItems[0]);

        // Make stuff animate on load
        series.appear(1000, 100);

        return () => SunburstFlavorWheelRoot && SunburstFlavorWheelRoot.dispose();
    }, [mode, customColors]);

    return (<div id="SunburstFlavorWheelchartdiv" style={{ width: "100%", height: "650px" }}></div>);
};