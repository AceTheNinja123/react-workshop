"use client";
import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
interface dataType { "name": string; "value": number; "color": string; "polarities": string; }
const restaurantTreeMapData: {
  [key: string]: Array<{ name: string; children: Array<dataType> }>;
} = {
  "children": [
    {
      "name": "Neutral",
      "children": [
        { "name": "table", "value": 220, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "menu", "value": 180, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "drink", "value": 160, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "order", "value": 140, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "meal", "value": 120, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "plate", "value": 90, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "dish", "value": 85, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "bill", "value": 70, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "reservation", "value": 65, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "crowd", "value": 60, "color": "#c9c9cd", "polarities": "Neutral" }
      ]
    },
    {
      "name": "Negative",
      "children": [
        { "name": "slow", "value": 55, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "cold", "value": 48, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "expensive", "value": 42, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "dirty", "value": 38, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "rude", "value": 29, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "noisy", "value": 25, "color": "#e55d5d", "polarities": "Negative" }
      ]
    },
    {
      "name": "Positive",
      "children": [
        { "name": "delicious", "value": 170, "color": "#7ec991", "polarities": "Positive" },
        { "name": "tasty", "value": 140, "color": "#7ec991", "polarities": "Positive" },
        { "name": "fresh", "value": 130, "color": "#7ec991", "polarities": "Positive" },
        { "name": "friendly", "value": 115, "color": "#7ec991", "polarities": "Positive" },
        { "name": "fast", "value": 100, "color": "#7ec991", "polarities": "Positive" },
        { "name": "clean", "value": 95, "color": "#7ec991", "polarities": "Positive" },
        { "name": "cozy", "value": 88, "color": "#7ec991", "polarities": "Positive" },
        { "name": "affordable", "value": 72, "color": "#7ec991", "polarities": "Positive" }
      ]
    }
  ]
};
export default function RectangularTreeMap() {
    useLayoutEffect(() => {
        const tooltipHTML = '<strong>{name}</strong><br>Occurrences: <b>{value}</b><br><b>{polarities}</b>';
        // Create RTMRoot element
        const RTMRoot = am5.Root.new("RTMChart");

        // Create custom theme...
        const myTheme = am5.Theme.new(RTMRoot);

        // ... no stroke and fill on zero level
        myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth0"]).setAll({ strokeOpacity: 0, fillOpacity: 0, stroke: am5.color(0x000000) });

        // ... thick stroke and full opacity on first level
        myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth1"]).setAll({ strokeWidth: 5, fillOpacity: 1, stroke: am5.color(0x000000) });

        // ... no fill and thin stroke on second level
        myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth2"]).setAll({ strokeWidth: 1, stroke: am5.color(0x000000) });

        //  ... by default last lever is not clickable, but we change it here, so, add pointer on the last level
        myTheme.rule("HierarchyNode", ["last"]).setAll({ cursorOverStyle: "pointer" });

        // ... set global settings for all labels
        myTheme.rule("Label", ["node"]).setAll({ fontSize: 13, minScale: 0.7 });

        // ... hide label of zero level
        myTheme.rule("Label", ["node", "depth0"]).setAll({ forceHidden: true });

        // ... hide label of first level
        myTheme.rule("Label", ["node", "depth1"]).setAll({ forceHidden: true });

        // Set themes
        RTMRoot.setThemes([am5themes_Animated.new(RTMRoot), myTheme]);

        // Create series
        const series = RTMRoot.container.children.push(am5hierarchy.VoronoiTreemap.new(RTMRoot, {
            valueField: "value",
            categoryField: "name",
            childDataField: "children",
            idField: "name",
            type: "rectangle",
            paddingBottom: 30,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 30
        }));

        // Set screen reader text for the chart
        series.set("ariaLabel", "A Rectangular Tree Map chart");

        series.polygons.template.adapters.add("fill", function (fill, target) {
            const dataItem = target.dataItem;
            const dataContext = dataItem?.dataContext as dataType;
            if (dataContext.polarities == 'Neutral') { return am5.color(dataContext.color); }
            if (dataContext.polarities == 'Negative') { return am5.color(dataContext.color); }
            if (dataContext.polarities == 'Positive') { return am5.color(dataContext.color); }
            else { return RTMRoot.interfaceColors.get("primaryButtonHover"); }
        });

        // Show full name if polygon is big and only the id if its small
        series.labels.template.adapters.add("x", function (x, target) {
            const dataContext = target.dataItem?.dataContext as dataType;
            if (dataContext) {
                target.set("text", dataContext.name);
            }
            return x;
        });

        series.nodes.template.setAll({ tooltipHTML: tooltipHTML });
        series.data.setAll([restaurantTreeMapData]);
        series.set("selectedDataItem", series.dataItems[0]);
        series.appear(1000, 100);

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(RTMRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(RTMRoot, { useDefaultCSS: false }),
            filePrefix: "Rectangular_Tree_Map_Chart",
            //title: "Review Rating Column Chart", 
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => RTMRoot && RTMRoot.dispose();
    }, []);

    return (
        <><div id="RTMChart" style={{ width: "100%", height: "650px" }}></div></>
    );
};