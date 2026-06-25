/** 
 * ForceDirectedTree Component 
 * Renders an interactive force-directed tree chart using amCharts 5 library.
 * Features include:
 * - Interactive nodes with drag-to-zoom and pan capabilities
 * - Theme-aware styling (light/dark mode support via Material-UI)
 * - Responsive hierarchy chart with category and value fields
 * @component
 * @returns {JSX.Element} A chart container div that is 100% width and 650px height
 */
"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { ForceDirectedTreeData } from "./ForceDirectedTreeData"

export default function ForceDirectedTree() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;
    useLayoutEffect(() => {
        // Create ForceDirectedTreeRoot element
        const ForceDirectedTreeRoot = am5.Root.new("ForceDirectedTreeDiv");

        // Set themes
        ForceDirectedTreeRoot.setThemes([am5themes_Animated.new(ForceDirectedTreeRoot)]);

        const zoomableContainer = ForceDirectedTreeRoot.container.children.push(
            am5.ZoomableContainer.new(ForceDirectedTreeRoot, {
                width: am5.p100,
                height: am5.p100,
                wheelable: true,
                pinchZoom: true
            })
        );

        zoomableContainer.children.push(am5.ZoomTools.new(ForceDirectedTreeRoot, { target: zoomableContainer }));

        // Create series
        const series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(ForceDirectedTreeRoot, {
            maskContent: false, //!important with zoomable containers
            singleBranchOnly: false,
            downDepth: 2,
            topDepth: 1,
            initialDepth: 3,
            valueField: "value",
            categoryField: "name",
            childDataField: "children",
            idField: "name",
            linkWithField: "linkWith",
            manyBodyStrength: -10,
            centerStrength: 0.8
        }));

        series.get("colors")?.setAll({
            colors: customColors.map(color => am5.color(color)),
        });

        series.links.template.set("strength", 0.5);
        series.labels.template.set("minScale", 0);

        series.data.setAll([ForceDirectedTreeData]);

        series.set("selectedDataItem", series.dataItems[0]);

        // Make stuff animate on load
        series.appear(1000, 100);

        return () => ForceDirectedTreeRoot && ForceDirectedTreeRoot.dispose();
    }, [mode, customColors]);

    return (<><div id="ForceDirectedTreeDiv" style={{ width: "100%", height: "650px" }}></div></>);
};