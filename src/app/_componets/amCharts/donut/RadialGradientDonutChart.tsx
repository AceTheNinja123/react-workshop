'use client'
import React, { useLayoutEffect } from "react";
//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface PieType {
  name: string;
  value: number;
  color: string;
}

const favouriteFruits: PieType[] = [
  { name: "Apples", value: 25, color: "#E53935" },   // Red
  { name: "Bananas", value: 20, color: "#FDD835" },  // Yellow
  { name: "Cherries", value: 15, color: "#C2185B" }, // Dark pink
  { name: "Grapes", value: 12, color: "#7B1FA2" },   // Purple
  { name: "Oranges", value: 10, color: "#FB8C00" },  // Orange
  { name: "Strawberries", value: 8, color: "#D81B60" }, // Pink-red
  { name: "Watermelons", value: 5, color: "#388E3C" },  // Green
  { name: "Pineapples", value: 3, color: "#FFA000" },   // Golden yellow
  { name: "Blueberries", value: 2, color: "#1E88E5" },  // Blue
];

const RadialGradientDonutChart = () => {
    useLayoutEffect(() => {
        const RadialGradientDonutChart = am5.Root.new("RadialGradientDonutChartDiv");

        // Set themes
        RadialGradientDonutChart.setThemes([am5themes_Animated.new(RadialGradientDonutChart)]);

        // Create chart
        const chart = RadialGradientDonutChart.container.children.push(am5percent.PieChart.new(RadialGradientDonutChart, {
            layout: RadialGradientDonutChart.verticalLayout,
            radius: am5.percent(90),
            innerRadius: am5.percent(50),
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20
        }));

        // Screen reader label
        chart.set("ariaLabel", "A Donut chart that shows top 10 favourite fruits");

        // Create series
        const pieSeries = chart.series.push(
            am5percent.PieSeries.new(RadialGradientDonutChart, {
                name: "Top 10 Favourite Fruits",
                valueField: "value",
                categoryField: "name",
                legendLabelText: "{category}",
                legendValueText: "",
            })
        );

        // Disabling labels and ticks
        pieSeries.labels.template.set("visible", false);
        pieSeries.ticks.template.set("visible", false);

        // Adding gradients
        pieSeries.slices.template.set("strokeOpacity", 0);
        pieSeries.slices.template.adapters.add("fillGradient", (gradient, target) => {
            const dataContext: any = target.dataItem?.dataContext;
            if (dataContext?.color) {
                return am5.RadialGradient.new(RadialGradientDonutChart, {
                    stops: [
                        { color: am5.color(dataContext.color), brighten: -0.8 },
                        { color: am5.color(dataContext.color), brighten: -0.4 },
                        { color: am5.color(dataContext.color), brighten: 0 },
                        { color: am5.color(dataContext.color), brighten: -0.4 },
                    ]
                });
            }
            return gradient;
        });
        // Set data
        pieSeries.data.setAll(favouriteFruits);

        // Create legend
        const legend = chart.children.push(am5.Legend.new(RadialGradientDonutChart, { centerX: am5.percent(50), x: am5.percent(50), }));

        // Style legend markers and labels
        legend.markers.template.setAll({ width: 24, height: 24, });
        legend.valueLabels.template.setAll({ textAlign: "right" })
        legend.labels.template.setAll({ fontSize: 16, fontWeight: "600",});
        legend.data.setAll(pieSeries.dataItems);

        // Play animation
        pieSeries.appear(1000, 100);

        return () => RadialGradientDonutChart && RadialGradientDonutChart.dispose();
    }, []);

    return (<div id="RadialGradientDonutChartDiv" style={{ width: "100%", height: "740px" }}></div>);
};
export default RadialGradientDonutChart;