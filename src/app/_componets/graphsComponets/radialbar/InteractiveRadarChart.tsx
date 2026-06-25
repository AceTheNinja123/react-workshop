/*
  InteractiveRadarChart Component

  Renders an interactive radar chart for rating life areas (Health, Career, Love, etc.) from 1 to 10.
  Uses amCharts 5 for charting and Material UI for UI elements.

  Features:
  - Displays one life area at a time for user rating.
  - User selects a value (1–10) for each area; chart updates dynamically.
  - After all areas are rated, shows "All done!" message.
  - Chart colors and mode adapt to MUI theme.

  Internal State:
  - activeIndex: Current area being rated.
  - answers: Selected values for each area, as { [areaIndex]: value }.

  Data:
  - LifeData: Array of life areas, each with name, index, and possible values.

  Chart:
  - Radar chart with animated theme.
  - Each area is a category; value is user-selected.
  - Colors use theme.palette.customColors.

  Usage:
    <InteractiveRadarChart />

  File: src/app/_componets/graphsComponets/radialbar/InteractiveRadarChart.tsx
*/
"use client";
import React, { useLayoutEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from "@mui/material";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
const LifeData = [{ name: "Health", index: 0, value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, { name: "Career", index: 1, value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, { name: "Love", index: 2, value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, { name: "Spirituality", index: 3, value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, { name: "Family", index: 4, value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, { name: "Money", index: 5, value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, { name: "Fun", index: 6, value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, { name: "Friends", index: 7, value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]
export default function InteractiveRadarChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;
    const [activeIndex, setActiveIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const setValue = (areaIndex: number, value: number) => {
        setAnswers((prev) => ({ ...prev, [areaIndex]: value }));
        if (areaIndex < LifeData.length - 1) { setActiveIndex(areaIndex + 1); }
        else { setActiveIndex(areaIndex + 1); }
    };
    useLayoutEffect(() => {
        const InteractiveRadarRoot = am5.Root.new("InteractiveRadarDiv");
        const colors = am5.ColorSet.new(InteractiveRadarRoot, { colors: customColors.map(color => am5.color(color)) });
        // Set themes
        InteractiveRadarRoot.setThemes([am5themes_Animated.new(InteractiveRadarRoot)]);

        // Create chart
        const chart = InteractiveRadarRoot.container.children.push(am5radar.RadarChart.new(InteractiveRadarRoot, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX"
        }));

        // Create axes and their renderers
        const xRenderer = am5radar.AxisRendererCircular.new(InteractiveRadarRoot, {});
        xRenderer.labels.template.setAll({ radius: 10, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.set("stroke", mode == "light" ? am5.color(0x000000) : am5.color(0xffffff));
        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(InteractiveRadarRoot, {
            maxDeviation: 0,
            categoryField: "category",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(InteractiveRadarRoot, {})
        }));

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(InteractiveRadarRoot, {
            min: 0,
            max: 10,
            renderer: am5radar.AxisRendererRadial.new(InteractiveRadarRoot, { minGridDistance: 20 })
        }));

        yAxis.get("renderer").labels.template.set("forceHidden", true);
        yAxis.get("renderer").grid.template.set("stroke", mode == "light" ? am5.color(0x000000) : am5.color(0xffffff));

        // Create series
        const series = chart.series.push(am5radar.RadarColumnSeries.new(InteractiveRadarRoot, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            categoryXField: "category"
        }));

        series.columns.template.setAll({
            tooltipText: "{categoryX}: {valueY}",
            templateField: "columnSettings",
            strokeOpacity: 0,
            width: am5.p100
        });

        // Set data
        const data = [{ category: "Health", value: 0, columnSettings: { fill: colors.next() } }, { category: "Career", value: 0, columnSettings: { fill: colors.next() } }, { category: "Love", value: 0, columnSettings: { fill: colors.next() } }, { category: "Spirituality", value: 0, columnSettings: { fill: colors.next() } }, { category: "Family", value: 0, columnSettings: { fill: colors.next() } }, { category: "Money", value: 0, columnSettings: { fill: colors.next() } }, { category: "Fun", value: 0, columnSettings: { fill: colors.next() } }, { category: "Friends", value: 0, columnSettings: { fill: colors.next() } }];

        series.data.setAll(data);
        xAxis.data.setAll(data);

        // Animate chart
        series.appear(1000);
        chart.appear(1000, 100);

        // Function for updating value
        function setValue(index: number, value: number) {

            // Set value
            const row = data[index];
            row.value = value;
            series.data.setIndex(index, { category: row.category, value: value, columnSettings: row.columnSettings });
        }
        Object.entries(answers).forEach(([idx, val]) => setValue(Number(idx), val));
        return () => InteractiveRadarRoot && InteractiveRadarRoot.dispose();
    }, [mode, customColors, answers, activeIndex]);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Box className="areas" sx={{ textAlign: "center", width: "100%" }}>
                    {LifeData.map((area, idx) => (
                        <Box key={area.name} className="area" sx={{ display: idx === activeIndex ? "block" : "none", mb: 2 }}>
                            <Typography variant="h5" gutterBottom>{area.name}</Typography>
                            <Box className="values" sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                                {area.value.map((val) => (
                                    <Button key={val} variant={answers[area.index] === val ? "contained" : "outlined"} onClick={() => setValue(area.index, val)} sx={{ width: 40, height: 40, minWidth: 0 }}>
                                        {val}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    ))}

                    {/* "All done" screen */}
                    {activeIndex === LifeData.length && (<Box className="area"> <Typography variant="h4" gutterBottom>All done!</Typography> </Box>)}
                </Box>
                <div id="InteractiveRadarDiv" style={{ width: "100%", height: "600px" }}></div>
            </Box >

        </>
    );
};