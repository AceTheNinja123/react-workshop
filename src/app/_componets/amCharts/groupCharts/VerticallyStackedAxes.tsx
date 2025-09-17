'use client'
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';

//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
interface dataType { category: string; strength: number; speed: number; intelligence: number; popularity: number; color: am5.Color; }

const VerticallyStackedAxes = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const backgroundDefault = theme.palette.background.default;
    const customColors = theme.palette.customColors;
    useLayoutEffect(() => {
        const VerticallyStackedAxesRoot = am5.Root.new("VerticallyStackedAxesDiv");

        const colors = am5.ColorSet.new(VerticallyStackedAxesRoot, { colors: customColors.map(color => am5.color(color)) });
        const data: dataType[] = [
            { category: "Superman", strength: 98, speed: 95, intelligence: 85, popularity: 92, color: colors.getIndex(0) },
            { category: "Batman", strength: 75, speed: 70, intelligence: 99, popularity: 95, color: colors.getIndex(1) },
            { category: "Wonder Woman", strength: 95, speed: 88, intelligence: 87, popularity: 90, color: colors.getIndex(2) },
            { category: "Spider-Man", strength: 80, speed: 90, intelligence: 85, popularity: 93, color: colors.getIndex(3) },
            { category: "Iron Man", strength: 78, speed: 72, intelligence: 96, popularity: 91, color: colors.getIndex(4) },
            { category: "Hulk", strength: 100, speed: 65, intelligence: 70, popularity: 85, color: colors.getIndex(5) },
            { category: "Thor", strength: 97, speed: 85, intelligence: 82, popularity: 89, color: colors.getIndex(6) },
        ];

        // Set themes
        VerticallyStackedAxesRoot.setThemes([am5themes_Animated.new(VerticallyStackedAxesRoot)]);

        // Create chart
        let chart = VerticallyStackedAxesRoot.container.children.push(
            am5xy.XYChart.new(VerticallyStackedAxesRoot, {
                panX: true,
                panY: false,
                wheelX: "none",
                wheelY: "none",
                arrangeTooltips: false,
                pinchZoomX: true
            })
        );

        // make y axes stack
        chart.leftAxesContainer.set("layout", VerticallyStackedAxesRoot.verticalLayout);

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(VerticallyStackedAxesRoot, { minGridDistance: 70 });
        xRenderer.labels.template.setAll({
            oversizedBehavior: "wrap",
            textAlign: "center",
            multiLocation: 0.5,
            location: 0.5,
            centerY: am5.p50,
            centerX: am5.p50,
            paddingTop: 10,
            minPosition: 0.01,
            maxPosition: 0.99,
            fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)
        });
        xRenderer.grid.template.setAll({ location: 0.5, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(VerticallyStackedAxesRoot, {
                categoryField: "category",
                tooltip: am5.Tooltip.new(VerticallyStackedAxesRoot, {}),
                renderer: xRenderer
            })
        );

        xAxis.data.setAll(data);

        // Add series
        function createSeries(field: string, heading: string, margin: number, column: boolean) {
            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(VerticallyStackedAxesRoot, {
                    renderer: am5xy.AxisRendererY.new(VerticallyStackedAxesRoot, {}),
                    tooltip: am5.Tooltip.new(VerticallyStackedAxesRoot, { animationDuration: 0 }),
                    x: am5.p100,
                    centerX: am5.p100,
                })
            );
            yAxis.axisHeader.children.push(am5.Label.new(VerticallyStackedAxesRoot, { text: heading, fontSize: 20, fontWeight: "bold", paddingTop: margin, paddingBottom: 10, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));
            yAxis.axisHeader.setAll({ background: am5.Rectangle.new(VerticallyStackedAxesRoot, { fill: am5.color(backgroundDefault) }) });
            yAxis.get("renderer").labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
            yAxis.get("renderer").grid.template.setAll({ stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
            let series;
            if (column) {
                series = chart.series.push(
                    am5xy.ColumnSeries.new(VerticallyStackedAxesRoot, {
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: field,
                        categoryXField: "category",
                        sequencedInterpolation: true,
                        tooltip: am5.Tooltip.new(VerticallyStackedAxesRoot, { pointerOrientation: "vertical", labelText: "{valueY}" })
                    })
                );
                series.columns.template.setAll({ strokeOpacity: 0 });
                series.columns.template.adapters.add("fill", function (fill, target) {
                    if (target.dataItem) {
                        const dataContext = target.dataItem.dataContext as dataType;
                        return dataContext.color;
                    }
                    return fill;
                })
            } else {
                series = chart.series.push(
                    am5xy.LineSeries.new(VerticallyStackedAxesRoot, {
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: field,
                        categoryXField: "category",
                        sequencedInterpolation: true,
                        stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff),
                        seriesTooltipTarget: "bullet",
                        tooltip: am5.Tooltip.new(VerticallyStackedAxesRoot, {
                            pointerOrientation: "vertical",
                            labelText: "{valueY}",

                        })
                    })
                );
                series.strokes.template.setAll({ strokeWidth: 2 });
            }

            if (!column && series instanceof am5xy.LineSeries) {
                series.bullets.push((root, series, dataItem) => {
                    const dataContext = dataItem.dataContext as dataType;
                    return am5.Bullet.new(root, {
                        locationY: 1,
                        locationX: 0.5,
                        sprite: am5.Circle.new(root, {
                            radius: 6,
                            fill: dataContext.color,
                            stroke: dataContext.color,
                            strokeWidth: 2
                        })
                    });
                });
                // Tooltip adapter to match bullet color
                series.get("tooltip")?.get("background")?.adapters.add("fill", (fill, target) => {
                    const dataContext = target.dataItem?.dataContext as dataType;
                    if (dataContext) {
                        return dataContext.color; // match tooltip background to bullet color
                    }
                    return fill;
                });
            }

            series.data.setAll(data);
            series.appear();

            return series;
        }

        createSeries("strength", "Strength", 0, false);
        createSeries("speed", "Speed", 30, true);
        createSeries("intelligence", "Intelligence", 30, false);
        //createSeries("popularity", "Popularity", 40, true);

        // Add cursor
        let cursor = chart.set("cursor", am5xy.XYCursor.new(VerticallyStackedAxesRoot, { behavior: "none", xAxis: xAxis }));

        // show x Axis label next to the panel on which cursor currently is will move above other elements
        xAxis.set("layer", 50);

        cursor.events.on("cursormoved", function () {
            let position = cursor.getPrivate("positionY");
            if (position) {
                let axisIndex = Math.floor(chart.yAxes.length * position)
                let axis = chart.yAxes.getIndex(axisIndex);
                if (axis) {
                    let y = axis.y() + axis.height();
                    let dy = Math.round(-(chart.plotContainer.height() - y));
                    let tooltip = xAxis.get("tooltip");
                    const xAxisDy = xAxis.get("dy") || 0;
                    if (Math.round(xAxisDy) != dy) {
                        xAxis.animate({ key: "dy", to: dy, duration: 600, easing: am5.ease.out(am5.ease.cubic) });
                        xAxis.set("y", 0);
                        if (tooltip) { tooltip.hide(0); }
                    }
                    else { if (tooltip) tooltip.show(300); }
                }
            }
        })

        // Make stuff animate on load
        chart.appear(1000, 100);

        return () => VerticallyStackedAxesRoot && VerticallyStackedAxesRoot.dispose();
    }, [mode, theme.palette.customColors]);

    return (<div id="VerticallyStackedAxesDiv" style={{ width: "100%", height: "740px" }}> </div>);
};
export default VerticallyStackedAxes; 