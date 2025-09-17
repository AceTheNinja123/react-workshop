"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function ImagesColumnChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;

    useLayoutEffect(() => {
        const ImagesColumnChartRoot = am5.Root.new("ImagesColumnChartDiv");

        // Set themes
        ImagesColumnChartRoot.setThemes([am5themes_Animated.new(ImagesColumnChartRoot)]);

        // Create chart
        const chart = ImagesColumnChartRoot.container.children.push(am5xy.XYChart.new(ImagesColumnChartRoot, { panX: false, panY: false, wheelX: "none", wheelY: "none", paddingBottom: 30, paddingLeft: 20, paddingRight: 20, paddingTop: 30, }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Radar chart");

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A column chart showing the amount of visitors from different country");

        // Data
        const colors = am5.ColorSet.new(ImagesColumnChartRoot, { step: 2, colors: customColors.map(color => am5.color(color)) });;

        const data = [
            { country: "US", visitors: 725, icon: "https://cdn-icons-png.flaticon.com/256/3909/3909383.png", columnSettings: { fill: colors.next() } },
            { country: "UK", visitors: 625, icon: "https://cdn-icons-png.flaticon.com/256/197/197374.png", columnSettings: { fill: colors.next() } },
            { country: "China", visitors: 602, icon: "https://cdn-icons-png.flaticon.com/512/323/323363.png", columnSettings: { fill: colors.next() } },
            { country: "Japan", visitors: 509, icon: "https://cdn-icons-png.flaticon.com/256/197/197604.png", columnSettings: { fill: colors.next() } },
            { country: "Germany", visitors: 322, icon: "https://cdn-icons-png.freepik.com/512/197/197571.png", columnSettings: { fill: colors.next() } },
            { country: "France", visitors: 214, icon: "https://cdn-icons-png.flaticon.com/512/197/197560.png", columnSettings: { fill: colors.next() } },
            { country: "India", visitors: 204, icon: "https://cdn-icons-png.flaticon.com/512/5315/5315471.png", columnSettings: { fill: colors.next() } },
            { country: "Spain", visitors: 198, icon: "https://cdn-icons-png.flaticon.com/512/5315/5315832.png", columnSettings: { fill: colors.next() } },
            { country: "Netherlands", visitors: 165, icon: "https://cdn-icons-png.flaticon.com/512/323/323275.png", columnSettings: { fill: colors.next() } },
            { country: "South Korea", visitors: 93, icon: "https://cdn-icons-png.flaticon.com/512/3909/3909425.png", columnSettings: { fill: colors.next() } },
            { country: "Canada", visitors: 41, icon: "https://cdn-icons-png.flaticon.com/512/5372/5372678.png", columnSettings: { fill: colors.next() } }
        ];

        // Create axes
        const xRenderer = am5xy.AxisRendererX.new(ImagesColumnChartRoot, { minGridDistance: 40, minorGridEnabled: true })
        xRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        xRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff), paddingTop: 20, oversizedBehavior: "wrap", });
        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ImagesColumnChartRoot, {
            categoryField: "country",
            renderer: xRenderer,
            bullet: function (ImagesColumnChartRoot, axis, dataItem: am5.DataItem<am5xy.IAxisDataItem>) {
                const dataContext = dataItem.dataContext as { contry: string; visitors: number; icon: string; columnSettings: object; };
                return am5xy.AxisBullet.new(ImagesColumnChartRoot, {
                    location: 0.5,
                    sprite: am5.Picture.new(ImagesColumnChartRoot, {
                        width: 30,
                        height: 30,
                        centerY: am5.p50,
                        centerX: am5.p50,
                        src: dataContext.icon
                    })
                });
            }
        }));

        xAxis.data.setAll(data);

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ImagesColumnChartRoot, {
            renderer: am5xy.AxisRendererY.new(ImagesColumnChartRoot, { strokeOpacity: 0.1 })
        }));
        const yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer.grid.template.setAll({ stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        yAxis.children.unshift(am5.Label.new(ImagesColumnChartRoot, {
            fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff),
            text: "Total Visitors from each country",
            rotation: -90,
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            y: am5.percent(50),
            x: am5.percent(50),
            centerY: am5.percent(50),
            paddingTop: 10,
            paddingBottom: 20
        }));

        // Add series
        const series = chart.series.push(am5xy.ColumnSeries.new(ImagesColumnChartRoot, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "visitors",
            categoryXField: "country"
        }));

        series.columns.template.setAll({ tooltipText: "{categoryX}: {valueY}", tooltipY: 0, strokeOpacity: 0, templateField: "columnSettings" });
        series.data.setAll(data);

        // Make stuff animate on load
        series.appear();
        chart.appear(1000, 100);

        // Add cursor to the chart
        const cursor = chart.set("cursor", am5xy.XYCursor.new(ImagesColumnChartRoot, {}));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(ImagesColumnChartRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(ImagesColumnChartRoot, { useDefaultCSS: false }),
            filePrefix: "Image_Column_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        //Adding logo to pdf
        exporting.events.on("pdfdocready", function (event) {
            // Add logo
            event.doc.content.unshift({
                cover: { width: 200, height: 100, valign: "top", align: "left" },
                align: "right"
            });
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => ImagesColumnChartRoot && ImagesColumnChartRoot.dispose();
    }, [mode]);

    return (<div id="ImagesColumnChartDiv" style={{ width: "100%", height: "680px" }}></div>);
};