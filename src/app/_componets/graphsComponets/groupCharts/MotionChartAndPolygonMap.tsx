"use client";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
//Amcharts
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5geodata_continentsLow from "@amcharts/amcharts5-geodata/continentsLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
//Charts
import { countries, motionChartDataType, countryType } from "./mapData"

export default function MotionChartAndPolygonMap() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;

    useLayoutEffect(() => {
        const MCPMRoot = am5.Root.new("MotionChartAndPolygonMap");
        const colorSet = am5.ColorSet.new(MCPMRoot, { step: 2, colors: customColors.map(color => am5.color(color)) });
        let continents = { "AF": "Africa", "AS": "Asia", "EU": "Europe", "NA": "North America", "SA": "South America", "OC": "Oceania", "AN": "Antarctica" }
        let colors = { EU: colorSet.getIndex(0), NA: colorSet.getIndex(2), SA: colorSet.getIndex(4), AS: colorSet.getIndex(6), AF: colorSet.getIndex(8), OC: colorSet.getIndex(10), }

        // Set themes
        MCPMRoot.setThemes([am5themes_Animated.new(MCPMRoot)]);

        let yearData: { [year: number]: motionChartDataType[] } = {};
        let firstYear = 1925;
        let lastYear = 2025;
        let currentYear = firstYear;

        for (var year = firstYear; year <= lastYear; year++) {
            let data: Array<motionChartDataType> = [];
            yearData[year] = data;

            let i = 0;
            am5.object.each(countries, function (id: string | number, country: countryType) {
                if (year == firstYear) {
                    let dObj = {
                        id: id,
                        name: country.name,
                        continent: country.continent,
                        settings: { fill: colors[country.continent as keyof typeof colors] },
                        x: Math.random() * 100 * Math.random() * 2 + 1 + i * 2,
                        y: Math.random() * 40 * Math.random() + 1 + i / 10,
                        value: Math.round(Math.random() * 500) + Math.random() * 500
                    }

                    data.push(dObj);

                    country.data = [dObj];

                } else {
                    let previous = yearData[year - 1][i];
                    let dObj = {
                        id: id,
                        name: country.name,
                        continent: country.continent,
                        settings: { fill: colors[country.continent as keyof typeof colors] },
                        x: previous.x + (Math.random() * 10 - 3),
                        y: previous.y + (Math.random() * 2 - 0.6),
                        value: Math.abs(previous.value + (Math.random() * 100 - 40))
                    }
                    data.push(dObj);
                    country.data?.push(dObj);
                }
                i++;
            })
        }

        // main container
        let mainContainer = MCPMRoot.container.children.push(am5.Container.new(MCPMRoot, {
            width: am5.p100,
            height: am5.p100,
            layout: MCPMRoot.verticalLayout
        }))

        // Create chart
        let chart = mainContainer.children.push(am5xy.XYChart.new(MCPMRoot, {
            panX: false,
            panY: false,
            wheelY: "none",
            pinchZoomX: false,
            pinchZoomY: false,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 30
        }));

        // Create axes
        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(MCPMRoot, {
            min: 0,
            max: 1000,
            renderer: am5xy.AxisRendererX.new(MCPMRoot, { minGridDistance: 50 }),
            tooltip: am5.Tooltip.new(MCPMRoot, {})
        }));
        xAxis.children.push(am5.Label.new(MCPMRoot, { text: "Hypothetical metric X", x: am5.p50, centerX: am5.p50, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }));
        const xRenderer = xAxis.get("renderer");
                xRenderer.grid.template.setAll({stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })
        
        xRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(MCPMRoot, {
            min: 0,
            max: 120,
            renderer: am5xy.AxisRendererY.new(MCPMRoot, {}),
            tooltip: am5.Tooltip.new(MCPMRoot, {})
        }));
        yAxis.children.moveValue(am5.Label.new(MCPMRoot, { text: "Hypothetical metric Y", rotation: -90, y: am5.p50, centerX: am5.p50, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) }), 0);
        const yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) });
        yRenderer.grid.template.setAll({ location: 1, stroke: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        // Create series
        let bubbleSeries = chart.series.push(am5xy.LineSeries.new(MCPMRoot, {
            calculateAggregates: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "y",
            valueXField: "x",
            valueField: "value"
        }));

        bubbleSeries.strokes.template.set("visible", false);

        // Add bullet
        type BubbleDataItem = typeof bubbleSeries["dataItem"];
        let circleTemplate: am5.Template<am5.Circle> = am5.Template.new({ tooltipY: 0 });
        circleTemplate.states.create("transparent", { opacity: 0.15 });
        circleTemplate.events.on("pointerover", handleOver);
        circleTemplate.events.on("pointerout", handleOut);
        circleTemplate.events.on("click", handleClick);
        function handleOver(e: am5.ISpritePointerEvent) {
            let target = e.target;
            am5.array.each(bubbleSeries.dataItems, function (dataItem: BubbleDataItem) {
                if (dataItem?.bullets) {
                    let bullet = dataItem.bullets[0];
                    if (bullet) {
                        let sprite = bullet.get("sprite");
                        if (sprite && sprite != target) { sprite.states.applyAnimate("transparent"); }
                    }
                }
            })
        }

        function handleOut(e: am5.ISpritePointerEvent) {
            am5.array.each(bubbleSeries.dataItems, function (dataItem: BubbleDataItem) {
                if (dataItem?.bullets) {
                    let bullet = dataItem.bullets[0];
                    if (bullet) {
                        let sprite = bullet.get("sprite");
                        if (sprite) { sprite.states.applyAnimate("default"); }
                    }
                }
            })
        }

        let selectedDataItem: BubbleDataItem | undefined;
        function handleClick(e: am5.ISpritePointerEvent) {
            if (selectedDataItem == e.target.dataItem) {
                am5.array.each(bubbleSeries.dataItems, function (dataItem: BubbleDataItem) {
                    if (dataItem?.bullets) {
                        let bullet = dataItem.bullets[0];
                        if (bullet) {
                            let sprite = bullet.get("sprite");
                            if (sprite) { sprite?.setAll({ opacity: 1 }); }
                        }
                    }
                })
                lineSeries.data.clear();
            } else {
                selectedDataItem = e.target.dataItem;
                const dataContext: motionChartDataType = selectedDataItem?.dataContext as motionChartDataType;
                const country = countries[dataContext["id"]];
                if (dataContext["id"] && country.data) lineSeries.data.setAll(country.data);
                lineSeries.show();

                am5.array.each(bubbleSeries.dataItems, function (dataItem: BubbleDataItem) {
                    if (dataItem?.bullets) {
                        let bullet = dataItem.bullets[0];
                        if (bullet) {
                            let sprite = bullet.get("sprite");
                            if (sprite) {
                                if (dataItem != selectedDataItem) { sprite?.setAll({ opacity: 0.2 }); }
                                else { sprite?.setAll({ opacity: 1 }); }
                            }
                        }
                    }
                })
            }
        }

        bubbleSeries.bullets.push(function () {
            let bulletCircle = am5.Circle.new(MCPMRoot, {
                radius: 5,
                templateField: "settings",
                fillOpacity: 0.9,
                tooltipText: "[fontSize:18px; bold]{name}[/]\nMetric Y: {valueY}\nMetric X: {valueX}$\nMetric bubble: {value}"
            }, circleTemplate);
            return am5.Bullet.new(MCPMRoot, { sprite: bulletCircle });
        });

        // Add heat rule
        bubbleSeries.set("heatRules", [{
            target: circleTemplate,
            min: 3,
            max: 35,
            dataField: "value",
            key: "radius", maxValue: 4000
        }]);

        // line series
        let lineSeries = chart.series.push(am5xy.LineSeries.new(MCPMRoot, {
            valueXField: "x",
            valueYField: "y",
            xAxis: xAxis,
            yAxis: yAxis,
            stroke: am5.color(0x00000)
        }))

        lineSeries.strokes.template.set("strokeOpacity", 0.3);

        lineSeries.bullets.push(function () {
            let bulletCircle = am5.Circle.new(MCPMRoot, {
                radius: 2,
                fill: lineSeries.strokes.template.get("stroke"),
            });
            return am5.Bullet.new(MCPMRoot, { sprite: bulletCircle });
        });

        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(MCPMRoot, {
            xAxis: xAxis,
            yAxis: yAxis,
            snapToSeries: [bubbleSeries]
        }));

        // Label
        let yearLabel = chart.plotContainer.children.push(am5.Label.new(MCPMRoot, {
            text: currentYear.toString(),
            fontSize: "10em",
            opacity: 0.15,
            x: am5.p50,
            y: am5.p50,
            fontFamily: "Courier New",
            textAlign: "right",
            centerY: am5.p50,
            centerX: am5.p50,
            fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff)
        }));

        // Create controls
        let yearSliderContainer = mainContainer.children.push(am5.Container.new(MCPMRoot, {
            width: am5.percent(100),
            layout: MCPMRoot.horizontalLayout,
            paddingLeft: 70,
            paddingRight: 40,
            exportable: false
        }));

        let playButton = yearSliderContainer.children.push(am5.Button.new(MCPMRoot, {
            themeTags: ["play"],
            centerY: am5.p50,
            marginRight: 20,
            icon: am5.Graphics.new(MCPMRoot, { themeTags: ["icon"] })
        }));

        let slider = yearSliderContainer.children.push(am5.Slider.new(MCPMRoot, {
            orientation: "horizontal",
            start: 0,
            centerY: am5.p50
        }));

        playButton.events.on("click", function () {
            if (playButton.get("active")) {
                if (slider) { slider.set("start", (slider.get("start") ?? 0) + 0.0001); }
            } else {
                if (slider) {
                    slider.animate({
                        key: "start",
                        to: 1,
                        duration: 15000 * (1 - (slider.get("start") ?? 0))
                    });
                }
            }
        });


        slider.on("start", function (start: number | undefined) { if (start === 1) { playButton.set("active", false); } });

        slider.events.on("rangechanged", function () { updateSeriesData(firstYear + Math.round(slider.get("start", 0) * (lastYear - firstYear))); });

        // Create the map chart
        let navMap = chart.plotContainer.children.push(am5map.MapChart.new(MCPMRoot, {
            projection: am5map.geoNaturalEarth1(),
            rotationX: -11,
            width: 250,
            height: 150,
            x: am5.percent(100),
            y: am5.percent(100),
            centerY: am5.percent(100),
            centerX: am5.percent(100),
            panY: "none",
            panX: "none"
        }));


        // Create main polygon series for countries
        let polygonSeries = navMap.series.push(am5map.MapPolygonSeries.new(MCPMRoot, {
            geoJSON: am5geodata_continentsLow,
            exclude: ["antarctica"]
        }));

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.setAll({ templateField: "settings", tooltipText: "{name}", interactive: true });
        polygonTemplate.states.create("disabled", { fill: MCPMRoot.interfaceColors.get("disabled") });
        polygonTemplate.events.on("pointerover", handleContinentOver);
        polygonTemplate.events.on("click", handleContinentClick);
        polygonTemplate.events.on("pointerout", handleOut);

        function handleContinentOver(e: am5.ISpritePointerEvent) {
            let target = e.target;
            am5.array.each(bubbleSeries.dataItems, function (dataItem: BubbleDataItem) {
                if (dataItem?.bullets) {
                    let bullet = dataItem.bullets[0];
                    if (bullet) {
                        let sprite = bullet.get("sprite");
                        if (sprite) {
                            const dataContext = target.dataItem?.dataContext as { code: string };
                            const spriteDataContext = sprite.dataItem?.dataContext as { continent: string };
                            if (dataContext.code == spriteDataContext.continent) { sprite.states.applyAnimate("default"); }
                            else { sprite.states.applyAnimate("transparent"); }
                        }
                    }
                }
            })
        }
        type mapPolygonDataItem = typeof polygonSeries["dataItem"];
        let selectedContinent: mapPolygonDataItem | undefined;

        function handleContinentClick(e: am5.ISpritePointerEvent) {
            let target = e.target;
            if (target.dataItem == selectedContinent) {
                selectedContinent = undefined;
                am5.array.each(polygonSeries.dataItems, function (dataItem) {
                    let mapPolygon = dataItem.get("mapPolygon");
                    mapPolygon.states.applyAnimate("default");
                })

                am5.array.each(bubbleSeries.dataItems, function (dataItem) {
                    if (dataItem.bullets) {
                        let bullet = dataItem.bullets[0];
                        if (bullet) {
                            let sprite = bullet.get("sprite");
                            if (sprite) { sprite.set("forceHidden", false); }
                        }
                    }
                })
            }
            else {
                selectedContinent = target.dataItem;

                am5.array.each(polygonSeries.dataItems, function (dataItem) {
                    let mapPolygon = dataItem.get("mapPolygon");
                    if (dataItem != selectedContinent) { mapPolygon.states.applyAnimate("disabled"); }
                    else { mapPolygon.states.applyAnimate("default"); }
                })

                am5.array.each(bubbleSeries.dataItems, function (dataItem: BubbleDataItem) {
                    if (dataItem?.bullets) {
                        let bullet = dataItem.bullets[0];
                        let sprite = bullet.get("sprite");
                        const targetDataContext = target.dataItem?.dataContext as { code: string };
                        const spriteDataContext = sprite.dataItem?.dataContext as { continent: string };
                        if (targetDataContext.code == spriteDataContext.continent) { sprite.set("forceHidden", false); }
                        else { sprite.set("forceHidden", true); }
                    }
                })
            }
        }

        polygonSeries.data.setAll([
            { id: "europe", code: "EU", settings: { fill: colors.EU } },
            { id: "northAmerica", code: "NA", settings: { fill: colors.NA } },
            { id: "southAmerica", code: "SA", settings: { fill: colors.SA } },
            { id: "asia", code: "AS", settings: { fill: colors.AS } },
            { id: "africa", code: "AF", settings: { fill: colors.AF } },
            { id: "oceania", code: "OC", settings: { fill: colors.OC } }
        ])

        function updateSeriesData(year: number) {
            if (currentYear != year) {
                currentYear = year;
                let data = yearData[year];

                let i = 0;
                am5.array.each(data, function (item) {
                    bubbleSeries.data.setIndex(i, item);
                    i++;
                });

                yearLabel.set("text", year.toString());
            }
        }

        bubbleSeries.data.setAll(yearData[currentYear]);

        // Make stuff animate on load
        bubbleSeries.appear(1000);
        chart.appear(1000, 100);

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(MCPMRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(MCPMRoot, {}),
            filePrefix: "Polygon_Map_Chart",
            pngOptions: { quality: 0.7 },
            jpgOptions: { quality: 0.7 },
            pdfOptions: { align: "center", pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false },
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => MCPMRoot && MCPMRoot.dispose();
    }, [mode]);

    return (<div id="MotionChartAndPolygonMap" style={{ width: "100%", height: "650px" }}></div>);
};