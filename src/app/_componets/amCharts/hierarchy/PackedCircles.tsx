"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
interface dataType { "name": string; "value": number; "color": string; "polarities": string; }
import { PackedCirclesRestaurant } from "./chartData"

export default function PackedCircles() {
    const theme = useTheme();
    const mode = theme.palette.mode;

    useLayoutEffect(() => {
        // const tooltipHTML = '<strong>{name}</strong><br>Occurrences: <b>{value}</b>';
        // Create PCRoot element
        const PCRoot = am5.Root.new("PCChart");

        // Create custom theme...
        const myTheme = am5.Theme.new(PCRoot);

        // ... no stroke and fill on zero level
        myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth0"]).setAll({ strokeOpacity: 0, fillOpacity: 0, stroke: am5.color(0x000000) });

        // ... thick stroke and full opacity on first level
        myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth1"]).setAll({ strokeOpacity: 0, fillOpacity: 0, stroke: am5.color(0x000000) });

        // ... no fill and thin stroke on second level
        myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth2"]).setAll({ strokeOpacity: 0, fillOpacity: 0, stroke: am5.color(0x000000) });

        //  ... by default last lever is not clickable, but we change it here, so, add pointer on the last level
        myTheme.rule("HierarchyNode", ["last"]).setAll({ cursorOverStyle: "pointer" });

        // ... set global settings for all labels
        myTheme.rule("Label", ["node"]).setAll({ fontSize: 13, minScale: 0.7 });

        // ... hide label of zero level
        //myTheme.rule("Label", ["node", "depth0"]).setAll({forceHidden: true});

        // ... hide label of first level
        //myTheme.rule("Label", ["node", "depth1"]).setAll({forceHidden: true});

        // Set themes
        PCRoot.setThemes([am5themes_Animated.new(PCRoot), myTheme]);

        // Create wrapper container
        const container = PCRoot.container.children.push(am5.Container.new(PCRoot, { width: am5.percent(100), height: am5.percent(100), layout: PCRoot.verticalLayout }));

        // Set screen reader text for the chart
        container.set("ariaLabel", "A Packed Circle chart");

        // Create series
        const series = container.children.push(am5hierarchy.Pack.new(PCRoot, {
            //singleBranchOnly: false, 
            maskContent: false,
            initialDepth: 2,
            topDepth: 1,
            valueField: "value",
            categoryField: "name",
            childDataField: "children",
            fillField: "color",
            tooltip: am5.Tooltip.new(PCRoot, { readerAnnounce: true, labelText: "[bold width:100px fontSize: \"1.10rem\"]{category}[/]\nOccurrences: {value}\n[bold]{polarities}[/]" }),
            legendLabelText: "{category}",
        }));

        series.circles.template.adapters.add("fill", function (fill, target) {
            const dataItem = target.dataItem;
            const dataContext = dataItem?.dataContext as dataType;
            if (dataContext && dataContext.polarities == 'Neutral') { return am5.color(dataContext.color); }
            if (dataContext && dataContext.polarities == 'Negative') { return am5.color(dataContext.color); }
            if (dataContext && dataContext.polarities == 'Positive') { return am5.color(dataContext.color); }
        });
        series.circles.template.adapters.add("stroke", function (stroke, target) {
            const dataItem = target.dataItem;
            const dataContext = dataItem?.dataContext as dataType;
            if (dataContext.polarities == 'Neutral') { return (mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)); }
            if (dataContext.polarities == 'Negative') { return (mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)); }
            if (dataContext.polarities == 'Positive') { return (mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)); }
        });
        series.nodes.template.adapters.add("tooltip", (tooltip, target) => {
            const dataItem = target.dataItem;
            const dataContext = dataItem?.dataContext as dataType;
            if (dataContext.name == 'Packed Circles') { target.hide(); return undefined; }
            //if (dataContext.name == 'Neutral') {target.hide();}
            //if (dataContext.name == 'Negative') {target.hide();}
            //if (dataContext.name == 'Positive') {target.hide();} 
            return tooltip;
        });

        //series.nodes.template.setAll({tooltipHTML: tooltipHTML});
        series.data.setAll([PackedCirclesRestaurant]);
        series.set("selectedDataItem", series.dataItems[0]);
        series.appear(1000, 100);
        /*
                const legend = container.children.push(am5.Legend.new(PCRoot, {centerX: am5.percent(50), x: am5.percent(50), centerY: am5.percent(100), y: am5.percent(100), layout: PCRoot.horizontalLayout}));
                legend.valueLabels.template.set("forceHidden", true);
                legend.labels.template.setAll({fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)});
                legend.data.setAll(series.dataItems[0].get("children"));
        */
        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(PCRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(PCRoot, { useDefaultCSS: false }),
            filePrefix: "Packed_Circles_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => PCRoot && PCRoot.dispose();
    }, [mode]);

    return (<><div id="PCChart" style={{ width: "100%", height: "650px" }}></div></>);
};