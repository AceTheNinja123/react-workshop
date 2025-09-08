'use client'
import React, { useLayoutEffect } from "react";
//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface pieType { name: string; value: number; color: string; }
const favouriteColours: pieType[] = [{ name: "Blue", value: 22, color: "#2196F3" }, { name: "Red", value: 18, color: "#F44336" }, { name: "Green", value: 15, color: "#4CAF50" }, { name: "Purple", value: 12, color: "#9C27B0" }, { name: "Black", value: 10, color: "#212121" }, { name: "Pink", value: 8, color: "#E91E63" }, { name: "Orange", value: 6, color: "#FF9800" }, { name: "Yellow", value: 5, color: "#FFEB3B" }, { name: "White", value: 2, color: "#FAFAFA" }, { name: "Teal", value: 2, color: "#009688" },];

const FavColoursDonutChart = () => {
    useLayoutEffect(() => {
        const donutChartRoot = am5.Root.new("donutChartdiv");

        // Set themes
        donutChartRoot.setThemes([am5themes_Animated.new(donutChartRoot)]);

        // Create chart
        const chart = donutChartRoot.container.children.push(am5percent.PieChart.new(donutChartRoot, {
            layout: donutChartRoot.verticalLayout,
            innerRadius: am5.percent(60),
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20
        }));

        // Screen reader label
        chart.set("ariaLabel", "A Donut chart that shows top 10 favourite colours");

        // Create series
        const pieSeries = chart.series.push(am5percent.PieSeries.new(donutChartRoot, {
            name: "Top 10 Favourite Colours",
            valueField: "value",
            categoryField: "name",
            fillField: "color",
            legendLabelText: "{category}",
            legendValueText: "",
        }));

        // Hide labels/ticks inside chart
        pieSeries.labels.template.set("forceHidden", true);
        pieSeries.ticks.template.set("forceHidden", true);

        // Add border to slices
        pieSeries.slices.template.setAll({ stroke: am5.color(0x000000), strokeWidth: 2, strokeOpacity: 1 });
        //Tooltip
        const tooltip = am5.Tooltip.new(donutChartRoot, { autoTextColor: false, labelText: "[bold]{name}[/]: {value}" });
        tooltip.get("background")!.setAll({ fillOpacity: 0.8, stroke: am5.color(0x000000), strokeOpacity: 0.8 });
        tooltip.label.setAll({ fill: am5.color(0x000000) });
        pieSeries.set("tooltip", tooltip);

        // Set data
        pieSeries.data.setAll(favouriteColours);

        // Create legend
        const legend = chart.children.push(am5.Legend.new(donutChartRoot, { centerX: am5.percent(50), x: am5.percent(50), layout: donutChartRoot.gridLayout, width: am5.percent(100), }));

        // Style legend markers and labels
        legend.markers.template.setAll({ width: 24, height: 24, });
        legend.labels.template.setAll({ fontSize: 16, fontWeight: "600" });
        legend.data.setAll(pieSeries.dataItems);

        // Play animation
        pieSeries.appear(1000, 100);

        return () => donutChartRoot && donutChartRoot.dispose();
    }, []);

    return (
        <div id="donutChartdiv" style={{ width: "100%", height: "740px" }}></div>
    );
};

export default FavColoursDonutChart;