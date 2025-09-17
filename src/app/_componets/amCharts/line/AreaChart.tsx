"use client";
import React, { useLayoutEffect, } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { format } from "date-fns";
interface dataType { name: string; data: Array<{ date: number; value: number }> }
const seriesareachart2: dataType[] = [
    {
        name: 'Sales Summery 1',
        data: [
            { date: new Date('2018-09-19T00:00:00').getTime(), value: 31 },
            { date: new Date('2018-09-19T01:30:00').getTime(), value: 40 },
            { date: new Date('2018-09-19T02:30:00').getTime(), value: 28 },
            { date: new Date('2018-09-19T03:30:00').getTime(), value: 51 },
            { date: new Date('2018-09-19T04:30:00').getTime(), value: 42 },
            { date: new Date('2018-09-19T05:30:00').getTime(), value: 109 },
            { date: new Date('2018-09-19T06:30:00').getTime(), value: 100 }
        ]
    },
    {
        name: 'Sales Summery 2',
        data: [
            { date: new Date('2018-09-19T00:00:00').getTime(), value: 11 },
            { date: new Date('2018-09-19T01:30:00').getTime(), value: 32 },
            { date: new Date('2018-09-19T02:30:00').getTime(), value: 45 },
            { date: new Date('2018-09-19T03:30:00').getTime(), value: 32 },
            { date: new Date('2018-09-19T04:30:00').getTime(), value: 34 },
            { date: new Date('2018-09-19T05:30:00').getTime(), value: 52 },
            { date: new Date('2018-09-19T06:30:00').getTime(), value: 41 }
        ]
    }
];
export default function AreaChart() {
    const theme = useTheme();
    const mode = theme.palette.mode;

    useLayoutEffect(() => {
        let areaRoot = am5.Root.new("areachartdiv");
        let colors = am5.ColorSet.new(areaRoot, { step: 2 });

        // Set themes
        areaRoot.setThemes([am5themes_Animated.new(areaRoot)]);

        // Create chart
        let chart = areaRoot.container.children.push(am5xy.XYChart.new(areaRoot, { panX: false, panY: false, layout: areaRoot.verticalLayout, paddingBottom: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 50 }));

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A area chart");

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(areaRoot, { minorGridEnabled: true, minGridDistance: 80 });
        xRenderer.labels.template.setAll({ oversizedBehavior: "wrap", rotation: -45, textAlign: "center", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        xRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(areaRoot, { baseInterval: { timeUnit: "hour", count: 1 }, tooltipDateFormat: "d MMM", startLocation: 0.5, endLocation: 0.5, maxDeviation: 0, renderer: xRenderer, tooltip: am5.Tooltip.new(areaRoot, {}) }));

        let yRenderer = am5xy.AxisRendererY.new(areaRoot, { strokeOpacity: 0.1, });
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(areaRoot, { extraMax: 0.1, renderer: yRenderer }));

        // Add legend
        let legend = chart.children.push(am5.Legend.new(areaRoot, { clickTarget: "none", dy: 20, centerX: am5.p50, x: am5.p50, centerY: am5.percent(100), y: am5.percent(100) }));
        legend.labels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        legend.valueLabels.template.setAll({ fontSize: 16, fontWeight: "bold", fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        // When legend item container is hovered, make only that series show
        legend.itemContainers.template.events.on("pointerover", function (e) {
            let itemContainer = e.target;
            let series = itemContainer.dataItem?.dataContext;
            chart.series.each(function (chartSeries) {
                let bullets = chartSeries.bullets;
                if (chartSeries != series) { chartSeries.hide(); }
                else {
                    if (chartSeries instanceof am5xy.SmoothedXLineSeries) chartSeries.strokes.template.setAll({ strokeWidth: 3 });
                    chartSeries.show();
                }
            })
        })

        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on("pointerout", function (e) {
            let itemContainer = e.target;
            let series = itemContainer.dataItem?.dataContext;
            chart.series.each(function (chartSeries) {
                if (chartSeries instanceof am5xy.SmoothedXLineSeries) chartSeries.strokes.template.setAll({ strokeOpacity: 1, strokeWidth: 1, stroke: chartSeries.get("fill") });
                chartSeries.show();
            });
        })

        const createSeries = (name: string, data: Array<{ date: number; value: number }>) => {
            let color = colors.next();
            // Add series
            let series = chart.series.push(am5xy.SmoothedXLineSeries.new(areaRoot, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date",
                //tooltip: am5.Tooltip.new(areaRoot, {readerAnnounce: true, labelText: "[bold]{valueX.formatDate('dd MMM')}[/]\n{name}: {valueY}"}), 
                stroke: color,
                fill: color,
                legendLabelText: name || "",
            }));

            series.strokes.template.setAll({ strokeWidth: 3 });
            series.data.setAll(data);
            series.fills.template.setAll({ visible: true, fillOpacity: 0.4 });
            /*series.bullets.push(function () {
                return am5.Bullet.new(areaRoot, {
                    locationY: 0, 
                    sprite: am5.Circle.new(areaRoot, {
                        radius: 8, 
                        stroke: areaRoot.interfaceColors.get("background"), 
                        strokeWidth: 2, 
                        fill: series.get("fill")
                    })
                });
            });*/

            series.appear(1000, 100);
            xAxis.data.setAll(data);

            return series;
        }
        if (seriesareachart2 && seriesareachart2.length > 0) {
            seriesareachart2.forEach(function (item) { createSeries(item.name, item.data); });
            setTimeout(() => { legend.data.setAll(chart.series.values); }, 100);
        }

        let tooltip = am5.Tooltip.new(areaRoot, {});
        tooltip.get("background")?.setAll({ fill: am5.color(0xe5e5e5), fillOpacity: 0.8, stroke: am5.color(0x000000), strokeOpacity: 0.8 });

        chart.plotContainer.set("tooltipPosition", "pointer");
        chart.plotContainer.set("tooltipText", "a");
        chart.plotContainer.set("tooltip", tooltip);

        const bulletSymbols = ['●', '▲', '■', '🟊', '▮', '▼', '◆'];

        tooltip.label.adapters.add("text", function (text, target) {
            text = "";
            let heading = "";
            let i = 0;
            let bulletSymbolsIndex = 0;
            let maxLabelLength = 0;

            // Determine the maximum width for series name and legend label text
            chart.series.each(function (series) {
                let labelText = series.get("legendLabelText");
                if (labelText && labelText.length > maxLabelLength) { maxLabelLength = labelText.length; }
            });

            chart.series.each(function (series) {
                let tooltipDataItem = series.get("tooltipDataItem");
                let labelText = series.get("legendLabelText");
                if (tooltipDataItem) {
                    if (i != 0) { text += "\n"; }
                    let bulletSymbol = "●";
                    let tooltipValueY = tooltipDataItem.get("valueY");
                    let tooltipValueX = tooltipDataItem.get("valueX");
                    if (tooltipValueX) {
                        //Setting heading and text for the tooltip
                        heading = '[bold width:100px fontSize: "1.05rem"]' + format(tooltipValueX, 'd MMM') + '[/]';
                        //text += '[' + series.get("fill") + 'width:15px ]' + bulletSymbol + '[/][bold]|[/][' + series.get("fill") + 'bold width:' + (maxLabelLength*15) + ']' + series.get("legendLabelText")  + '[/][bold width:10px ]|[/]' + tooltipValueY;
                        text += '[center' + series.get("fill") + 'width:15px ]' + bulletSymbol + '[/][bold width:' + (maxLabelLength * 8) + ']' + series.get("legendLabelText") + ':[/]' + tooltipValueY;
                    }
                }
                i++;
            });
            let Tooltip = heading + '\n' + text
            return Tooltip
        });

        // Add cursor to the chart
        let cursor = chart.set("cursor", am5xy.XYCursor.new(areaRoot, {}));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        // Make stuff animate on load
        chart.appear(1000, 100);

        return () => areaRoot && areaRoot.dispose();
    }, [mode, theme.palette.customColors]);

    return (<><div id={"areachartdiv"} style={{ width: "100%", height: "700px" }}></div></>);
};