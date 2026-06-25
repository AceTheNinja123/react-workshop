/**
 * SolidGaugeChart Component
 * 
 * A React component that renders an interactive solid gauge chart using amCharts 5.
 * The chart displays multiple data categories with radial column series representing
 * progress values against maximum values.
 * 
 * @component
 * @returns {JSX.Element} A div container with id "solidGaugeDiv" that renders the gauge chart
 * 
 * @example
 * ```tsx
 * <SolidGaugeChart />
 * ```
 * 
 * @remarks
 * - Uses Material-UI theme for styling and color customization
 * - Responsive chart with zoom and pan capabilities
 * - Supports light and dark mode themes
 * - Chart is rendered using amCharts 5 radar chart with two column series:
 *   - Series 1: Background bars showing full values (100%)
 *   - Series 2: Foreground bars showing actual values with tooltips
 * - Automatically disposes chart resources on component unmount
 * 
 * @dependencies
 * - @mui/material/styles
 * - @amcharts/amcharts5
 * - @amcharts/amcharts5/xy
 * - @amcharts/amcharts5/radar
 * - @amcharts/amcharts5/themes/Animated
 */
'use client'
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';

//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const SolidGaugeChart = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    useLayoutEffect(() => {
        // Create SolidGaugeRoot element
        const SolidGaugeRoot = am5.Root.new("solidGaugeDiv");

        // Set themes
        SolidGaugeRoot.setThemes([am5themes_Animated.new(SolidGaugeRoot)]);

        // Create chart
        const chart = SolidGaugeRoot.container.children.push(am5radar.RadarChart.new(SolidGaugeRoot, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            innerRadius: am5.percent(20),
            startAngle: -90,
            endAngle: 180
        }));

        // Data
        const data = [
            { category: "Research", value: 80, full: 100, columnSettings: { fill: theme.palette.customColors[1] } },
            { category: "Marketing", value: 35, full: 100, columnSettings: { fill: theme.palette.customColors[2] } },
            { category: "Distribution", value: 92, full: 100, columnSettings: { fill: theme.palette.customColors[3] } },
            { category: "Human Resources", value: 68, full: 100, columnSettings: { fill: theme.palette.customColors[4] } }
        ];

        // Add cursor
        const cursor = chart.set("cursor", am5radar.RadarCursor.new(SolidGaugeRoot, { behavior: "zoomX" }));
        cursor.lineY.set("visible", false);

        // Create axes and their renderers
        const xRenderer = am5radar.AxisRendererCircular.new(SolidGaugeRoot, {
            //minGridDistance: 50
        });
        xRenderer.labels.template.setAll({ radius: 10, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.setAll({ forceHidden: true });

        const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(SolidGaugeRoot, {
            renderer: xRenderer,
            min: 0,
            max: 100,
            strictMinMax: true,
            numberFormat: "#'%'",
            tooltip: am5.Tooltip.new(SolidGaugeRoot, {})
        }));

        const yRenderer = am5radar.AxisRendererRadial.new(SolidGaugeRoot, { minGridDistance: 20 });
        yRenderer.labels.template.setAll({
            centerX: am5.p100,
            fontWeight: "500",
            fontSize: 18,
            templateField: "columnSettings"
        });
        yRenderer.grid.template.setAll({ forceHidden: true });

        const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(SolidGaugeRoot, {
            categoryField: "category",
            renderer: yRenderer
        }));

        yAxis.data.setAll(data);


        // Create series
        const series1 = chart.series.push(am5radar.RadarColumnSeries.new(SolidGaugeRoot, {
            xAxis: xAxis,
            yAxis: yAxis,
            clustered: false,
            valueXField: "full",
            categoryYField: "category",
            fill: SolidGaugeRoot.interfaceColors.get("alternativeBackground")
        }));

        series1.columns.template.setAll({
            width: am5.p100,
            fillOpacity: 0.08,
            strokeOpacity: 0,
            cornerRadius: 20
        });

        series1.data.setAll(data);

        const series2 = chart.series.push(am5radar.RadarColumnSeries.new(SolidGaugeRoot, {
            xAxis: xAxis,
            yAxis: yAxis,
            clustered: false,
            valueXField: "value",
            categoryYField: "category"
        }));

        series2.columns.template.setAll({
            width: am5.p100,
            strokeOpacity: 0,
            tooltipText: "{category}: {valueX}%",
            cornerRadius: 20,
            templateField: "columnSettings"
        });

        series2.data.setAll(data);

        // Animate chart and series in
        series1.appear(1000);
        series2.appear(1000);
        chart.appear(1000, 100);
        // Cleanup function to dispose the chart
        return () => { SolidGaugeRoot.dispose(); };
    }, [mode, theme.palette.customColors]);

    return (<div id="solidGaugeDiv" style={{ width: "100%", height: "700px" }}> </div>);
};
export default SolidGaugeChart; 