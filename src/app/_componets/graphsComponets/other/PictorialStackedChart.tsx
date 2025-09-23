"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
//Interface for data and props
interface dataType { value: number; category: string; }
interface propsType { div: string; svgPath: string; data: dataType[]; name: string; }

export default function PictorialStackedChart({ div, svgPath, data, name }: propsType) {
    const theme = useTheme();
    const mode = theme.palette.mode;

    useLayoutEffect(() => {
        const root = am5.Root.new(div);

        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        const chart = root.container.children.push(am5percent.SlicedChart.new(root, { paddingBottom: 50, paddingLeft: 50, paddingRight: 20, paddingTop: 30, layout: root.verticalLayout }));
        //const title = chart.children.unshift(am5.Label.new(root, { text: name, fontSize: 24, centerY: 30, textAlign: "center", width: am5.p100, paddingBottom: 20, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Pictorial Stacked Chart for" + name);

        // Create series
        const series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
            name: name,
            alignLabels: true,
            orientation: "vertical",
            valueField: "value",
            categoryField: "category",
            svgPath: svgPath,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
        }));

        series.set("colors", am5.ColorSet.new(root, { step: 2 }))
        series.labelsContainer.set("width", 100);
        series.ticks.template.setAll({ location: 0.6, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff), strokeWidth: 2 });
        series.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        series.slices.template.setAll({ stroke: am5.color(0x000000), strokeWidth: 1, strokeOpacity: 1, });
        // Set data
        series.data.setAll(data);

        // Play initial series animation
        chart.appear(1000, 100);
        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            filePrefix: name + " Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { align: "center", pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false },
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        // Clean up
        return () => root && root.dispose();
    }, [mode, div, svgPath, data, name]);

    return (
        <div id={div} style={{ width: "100%", height: "325px" }}></div>
    );
}