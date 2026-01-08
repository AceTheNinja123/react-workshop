/**
 * PolarAreaChart component that displays a polar/radar chart visualization of grocery item popularity across months.
 * 
 * Uses amCharts 5 library to render an interactive polar area chart with stacked columns showing
 * data for Fruits, Vegetables, Dairy, and Meat categories across 12 months.
 * 
 * The chart includes:
 * - Dynamic color theming based on Material-UI theme (light/dark mode)
 * - Interactive cursor with zoom capabilities
 * - Responsive design with 100% width and 700px height
 * - Circular axis renderer with category labels
 * - Radial value axis
 * - Tooltip text on hover
 * 
 * @component
 * @returns {JSX.Element} A div container with the polar area chart rendered inside
 * 
 * @example
 * ```tsx
 * <PolarAreaChart />
 * ```
 */
"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
export const groceryPopularityData = [
    { category: "January", fruits: 80, vegetables: 65, dairy: 50, meat: 40 },
    { category: "February", fruits: 75, vegetables: 70, dairy: 55, meat: 45 },
    { category: "March", fruits: 90, vegetables: 80, dairy: 60, meat: 50 },
    { category: "April", fruits: 95, vegetables: 85, dairy: 65, meat: 55 },
    { category: "May", fruits: 100, vegetables: 90, dairy: 70, meat: 60 },
    { category: "June", fruits: 110, vegetables: 95, dairy: 75, meat: 65 },
    { category: "July", fruits: 120, vegetables: 100, dairy: 80, meat: 70 },
    { category: "August", fruits: 115, vegetables: 95, dairy: 78, meat: 68 },
    { category: "September", fruits: 105, vegetables: 90, dairy: 72, meat: 62 },
    { category: "October", fruits: 95, vegetables: 85, dairy: 68, meat: 58 },
    { category: "November", fruits: 85, vegetables: 75, dairy: 60, meat: 50 },
    { category: "December", fruits: 90, vegetables: 70, dairy: 65, meat: 55 }
];

export default function PolarAreaChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;
    useLayoutEffect(() => {
        const PolarAreaRoot = am5.Root.new("PolarAreaChartDiv");
        const colors = am5.ColorSet.new(PolarAreaRoot, { step: 3, colors: customColors.map(color => am5.color(color)) });
        // Set themes
        PolarAreaRoot.setThemes([am5themes_Animated.new(PolarAreaRoot)]);

        // Create chart
        const chart = PolarAreaRoot.container.children.push(am5radar.RadarChart.new(PolarAreaRoot, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX"
        }));

        // Add cursor
        const cursor = chart.set("cursor", am5radar.RadarCursor.new(PolarAreaRoot, { behavior: "zoomX" }));

        cursor.lineY.set("visible", false);

        // Create axes and their renderers
        const xRenderer = am5radar.AxisRendererCircular.new(PolarAreaRoot, {});
        xRenderer.labels.template.setAll({ radius: 10, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.set("stroke", mode == "light" ? am5.color(0x000000) : am5.color(0xffffff));
        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(PolarAreaRoot, {
            maxDeviation: 0,
            categoryField: "category",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(PolarAreaRoot, {})
        }));
        xAxis.data.setAll(groceryPopularityData);
        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(PolarAreaRoot, { renderer: am5radar.AxisRendererRadial.new(PolarAreaRoot, {}) }));
        yAxis.get("renderer").labels.template.set("forceHidden", true);
        yAxis.get("renderer").grid.template.set("stroke", mode == "light" ? am5.color(0x000000) : am5.color(0xffffff));

        // Create series
        const createSeries = (name: string, index: number, valueField: string) => {
            const series = chart.series.push(am5radar.RadarColumnSeries.new(PolarAreaRoot, {
                stacked: true,
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: valueField,
                categoryXField: "category",
                fill: colors.getIndex(index),
            }));

            series.set("stroke", PolarAreaRoot.interfaceColors.get("background"));
            series.columns.template.setAll({ width: am5.p100, strokeOpacity: 0.1, tooltipText: "{name}: {valueY}", });
            series.data.setAll(groceryPopularityData);

            series.appear(1000);
        }
        createSeries("Fruits", 0, "fruits");
        createSeries("Vegetables", 1, "vegetables");
        createSeries("Dairy", 2, "dairy");
        createSeries("Meat", 3, "meat");

        // Animate chart
        chart.appear(1000, 100);
        return () => PolarAreaRoot && PolarAreaRoot.dispose();
    }, [mode, customColors]);

    return (<><div id="PolarAreaChartDiv" style={{ width: "100%", height: "700px" }}></div></>);
};