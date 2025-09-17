"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
interface ChartData { date: string; value: number; }
interface HotelData { [key: string]: Array<ChartData>; "standardRooms": Array<ChartData>; "deluxeRooms": Array<ChartData>; "suiteRooms": Array<ChartData>; "familyRooms": Array<ChartData>; }
export default function XYChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;

    useLayoutEffect(() => {
        const XYRoot = am5.Root.new("XYChartDiv");

        const hotelData: HotelData = {
            "standardRooms": [
                { "date": "2023-01-01", "value": 40 },
                { "date": "2023-02-01", "value": 35 },
                { "date": "2023-03-01", "value": 45 },
                { "date": "2023-04-01", "value": 50 },
                { "date": "2023-05-01", "value": 42 },
                { "date": "2023-06-01", "value": 38 },
                { "date": "2023-07-01", "value": 46 },
                { "date": "2023-08-01", "value": 48 },
                { "date": "2023-09-01", "value": 44 },
                { "date": "2023-10-01", "value": 41 }
            ],
            "deluxeRooms": [
                { "date": "2023-01-01", "value": 25 },
                { "date": "2023-02-01", "value": 28 },
                { "date": "2023-03-01", "value": 22 },
                { "date": "2023-04-01", "value": 30 },
                { "date": "2023-05-01", "value": 24 },
                { "date": "2023-06-01", "value": 27 },
                { "date": "2023-07-01", "value": 29 },
                { "date": "2023-08-01", "value": 26 },
                { "date": "2023-09-01", "value": 31 },
                { "date": "2023-10-01", "value": 23 }
            ],
            "suiteRooms": [
                { "date": "2023-01-01", "value": 15 },
                { "date": "2023-02-01", "value": 18 },
                { "date": "2023-03-01", "value": 20 },
                { "date": "2023-04-01", "value": 12 },
                { "date": "2023-05-01", "value": 16 },
                { "date": "2023-06-01", "value": 19 },
                { "date": "2023-07-01", "value": 17 },
                { "date": "2023-08-01", "value": 21 },
                { "date": "2023-09-01", "value": 18 },
                { "date": "2023-10-01", "value": 20 }
            ],
            "familyRooms": [
                { "date": "2023-01-01", "value": 30 },
                { "date": "2023-02-01", "value": 33 },
                { "date": "2023-03-01", "value": 27 },
                { "date": "2023-04-01", "value": 25 },
                { "date": "2023-05-01", "value": 29 },
                { "date": "2023-06-01", "value": 32 },
                { "date": "2023-07-01", "value": 34 },
                { "date": "2023-08-01", "value": 28 },
                { "date": "2023-09-01", "value": 35 },
                { "date": "2023-10-01", "value": 26 }
            ]
        };

        // Set themes
        XYRoot.setThemes([am5themes_Animated.new(XYRoot)]);

        XYRoot.dateFormatter.setAll({
            dateFormat: "yyyy-MM-dd",
            dateFields: ["valueX"]
        });

        // Create chart
        const chart = XYRoot.container.children.push(am5xy.XYChart.new(XYRoot, { layout: XYRoot.verticalLayout, panX: false, panY: false, wheelY: "none", paddingBottom: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 50 }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A XY chart");

        chart.get("colors")!.set("step", 2);

        // Create axes
        const xAxis = chart.xAxes.push(am5xy.DateAxis.new(XYRoot, {
            baseInterval: { timeUnit: "day", count: 1 },
            autoZoom: false,
            renderer: am5xy.AxisRendererX.new(XYRoot, { minGridDistance: 50, minorGridEnabled: true }),
            tooltip: am5.Tooltip.new(XYRoot, {})
        }));
        const xRenderer = xAxis.get("renderer");
        xRenderer.axisFills.template.setAll({ fill: am5.color(0x000000), fillOpacity: 0.05, visible: true });
        xRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff), oversizedBehavior: "wrap", textAlign: "center" });
        xRenderer.grid.template.setAll({ stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(XYRoot, {
            renderer: am5xy.AxisRendererY.new(XYRoot, {}),
            autoZoom: false,
            tooltip: am5.Tooltip.new(XYRoot, {})
        }));
        const yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)  })

        yAxis.children.unshift(am5.Label.new(XYRoot, {
            fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff),
            text: "Revenue Generated by Month",
            rotation: -90,
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            y: am5.percent(50),
            x: am5.percent(50),
            centerY: am5.percent(50),
            paddingTop: 10,
            paddingBottom: 10
        }));

        const shapeTemplate: am5.Template<am5.Circle> = am5.Template.new({});

        const bulletShapes = [
            (XYRoot: am5.Root) => am5.Circle.new(XYRoot, { centerX: am5.p50, centerY: am5.p50 }, shapeTemplate),
            (XYRoot: am5.Root) => am5.Star.new(XYRoot, { spikes: 3, innerRadius: am5.percent(70), centerX: am5.p50, centerY: am5.p50 }, shapeTemplate as am5.Template<am5.Star>),
            (XYRoot: am5.Root) => am5.Star.new(XYRoot, { spikes: 4, innerRadius: am5.percent(70), centerX: am5.p50, centerY: am5.p50 }, shapeTemplate as am5.Template<am5.Star>),
            (XYRoot: am5.Root) => am5.Star.new(XYRoot, { rotation: 45, spikes: 4, innerRadius: am5.percent(70), centerX: am5.p50, centerY: am5.p50 }, shapeTemplate as am5.Template<am5.Star>),
            (XYRoot: am5.Root) => am5.Star.new(XYRoot, { spikes: 8, centerX: am5.p50, centerY: am5.p50 }, shapeTemplate as am5.Template<am5.Star>),
            // Add more shapes as needed
        ];

        // Add series
        function createSeries(name: string, data: ChartData[], bulletValue: number) {
            const color = am5.color(theme.palette.customColors[bulletValue % theme.palette.customColors.length]);
            const series = chart.series.push(am5xy.LineSeries.new(XYRoot, {
                name: name,
                calculateAggregates: true,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'value',
                valueXField: 'date',
                valueField: 'value',
                fill: color,
                tooltip: am5.Tooltip.new(XYRoot, { labelText: "[Bold fontSize: '1rem']{name}[/]\n[Bold]Date:[/] {valueX}\n[Bold]Value:[/] {value}" })
            }));

            // Add bullets with different shapes
            series.bullets.push(function () {
                const shapeIndex = bulletValue % bulletShapes.length; // Wrap around using modulus
                const bulletShape = bulletShapes[shapeIndex](XYRoot);
                bulletShape.setAll({ fill: series.get("fill") })
                return am5.Bullet.new(XYRoot, { sprite: bulletShape });
            });
            series.set("heatRules", [{
                target: shapeTemplate,
                min: 3,
                max: 35,
                dataField: "value",
                key: "radius"
            }]);
            series.strokes.template.set("strokeOpacity", 0);
            series.data.processor = am5.DataProcessor.new(XYRoot, { dateFields: ["date"], dateFormat: "yyyy-MM-dd" });
            series.data.setAll(data);
            series.appear(1000, 100);

            return series;
        }

        function formatRoomTypeName(roomType: string) {
            // Convert camelCase to regular text, capitalize first letter of each word
            return roomType.replace(/([A-Z])/g, ' $1')  // Insert a space before each capital letter
                .replace(/^./, (str: string) => str.toUpperCase());  // Capitalize the first letter
        }
        if (hotelData) {
            Object.keys(hotelData).map((key: string, index: number) => {
                const roomType = key as string;
                const chartTitle = formatRoomTypeName(roomType);
                createSeries(chartTitle, hotelData[roomType], index);
            });
        }
        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(XYRoot, {
            xAxis: xAxis,
            yAxis: yAxis,
            behavior: "zoomXY",
        }));

        // Add scrollbars
        //chart.set("scrollbarX", am5.Scrollbar.new(XYRoot, {orientation: "horizontal"}));
        //chart.set("scrollbarY", am5.Scrollbar.new(XYRoot, {orientation: "vertical"}));

        chart.appear(1000, 100);

        // Add legend
        const legend = chart.children.push(am5.Legend.new(XYRoot, { nameField: "name", fillField: "color", strokeField: "color", centerX: am5.p50, x: am5.p50, centerY: am5.p100, y: am5.p100, marginTop: 20 }));
        legend.labels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        legend.valueLabels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        // When legend item container is hovered, make only that series show
        legend.itemContainers.template.events.on("pointerover", function (e) {
            const itemContainer = e.target;
            // As series list is data of a legend, dataContext is series
            const series = itemContainer.dataItem?.dataContext;
            chart.series.each(function (chartSeries) {
                if (chartSeries != series) { chartSeries.hide(); }
                else { chartSeries.show(); }
            });
            legend.itemContainers.each(function (itemContainer) {
                const legendseries = itemContainer.dataItem?.dataContext;
                if (legendseries != series) { itemContainer.set("opacity", 0.5); }
                else { itemContainer.set("opacity", 1); }
            });
        });

        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on("pointerout", function () {
            chart.series.each(function (chartSeries) { chartSeries.show(); });
            legend.itemContainers.each(function (itemContainer) { itemContainer.set("opacity", 1); });
        });

        legend.data.setAll(chart.series.values);

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(XYRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(XYRoot, { useDefaultCSS: false }),
            filePrefix: "XY_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => XYRoot && XYRoot.dispose();
    }, [mode, theme.palette.customColors]);

    return (<><div id="XYChartDiv" style={{ width: "100%", height: "650px" }}></div></>);
};