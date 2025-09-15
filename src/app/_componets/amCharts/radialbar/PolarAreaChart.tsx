"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';

import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
interface dataType { categories: string; value: number; }
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

        // Generate and set data
        let cat = -1;
        let value = 10;
        function generateData() {
            value = Math.round(Math.random() * 10);
            cat++;
            return {
                category: "cat" + cat,
                value: value,
            };
        }

        function generateDatas(count: number) {
            cat = -1;
            let data = [];
            for (let i = 0; i < count; ++i) { data.push(generateData()); }
            return data;
        }

        // Create chart
        let chart = PolarAreaRoot.container.children.push(am5radar.RadarChart.new(PolarAreaRoot, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX"
        }));

        // Add cursor
        let cursor = chart.set("cursor", am5radar.RadarCursor.new(PolarAreaRoot, { behavior: "zoomX" }));

        cursor.lineY.set("visible", false);

        // Create axes and their renderers
        let xRenderer = am5radar.AxisRendererCircular.new(PolarAreaRoot, {});
        xRenderer.labels.template.setAll({ radius: 10, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.set("stroke", mode == "light" ? am5.color(0x000000) : am5.color(0xffffff));
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(PolarAreaRoot, {
            maxDeviation: 0,
            categoryField: "category",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(PolarAreaRoot, {})
        }));
        xAxis.data.setAll(groceryPopularityData);
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(PolarAreaRoot, { renderer: am5radar.AxisRendererRadial.new(PolarAreaRoot, {}) }));
        yAxis.get("renderer").labels.template.set("forceHidden", true);
        yAxis.get("renderer").grid.template.set("stroke", mode == "light" ? am5.color(0x000000) : am5.color(0xffffff));

        // Create series
        const createSeries = (name: string, index: number, valueField: string) => {
            let series = chart.series.push(am5radar.RadarColumnSeries.new(PolarAreaRoot, {
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
    }, [mode]);

    return (<><div id="PolarAreaChartDiv" style={{ width: "100%", height: "700px" }}></div></>);
};