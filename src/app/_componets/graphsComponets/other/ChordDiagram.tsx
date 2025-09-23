"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5index from "@amcharts/amcharts5/index";
import * as am5flow from "@amcharts/amcharts5/flow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
export const chordDiagramData = [
    { from: "Fruits", to: "Vegs", value: 80 },
    { from: "Fruits", to: "Dairy", value: 40 },
    { from: "Fruits", to: "Bakery", value: 30 },
    { from: "Vegs", to: "Meat", value: 60 },
    { from: "Vegs", to: "Dairy", value: 35 },
    { from: "Vegs", to: "Bakery", value: 25 },
    { from: "Dairy", to: "Meat", value: 50 },
    { from: "Dairy", to: "Bakery", value: 45 },
    { from: "Meat", to: "Bakery", value: 20 },
    { from: "Bakery", to: "Fruits", value: 55 }
];

const nodeData = [{ id: "Fruits" }, { id: "Vegs" }, { id: "Dairy" }, { id: "Meat" }, { id: "Bakery" }]
export default function ChordDiagram() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;
    useLayoutEffect(() => {
        // Create root element
        let root = am5.Root.new("chorddiagramchartdiv");
        const colors = am5.ColorSet.new(root, { step: 2, colors: customColors.map(color => am5.color(color)) });
        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);

        // Create series
        let series = root.container.children.push(
            am5flow.ChordDirected.new(root, {
                sourceIdField: "from",
                targetIdField: "to",
                valueField: "value",
                sort: "ascending",
                fill: colors.next()
            })
        );

        series.links.template.set("fillStyle", "source");

        series.nodes.get("colors")?.set("step", 2);
        series.nodes.data.setAll(nodeData);

        series.bullets.push(function (_root, _series, dataItem) {
            let bullet = am5.Bullet.new(root, {
                locationY: Math.random(),
                sprite: am5.Circle.new(root, {
                    radius: 5,
                    fill: dataItem.get("source").get("fill")
                })
            });

            bullet.animate({
                key: "locationY",
                to: 1,
                from: 0,
                duration: Math.random() * 1000 + 2000,
                loops: Infinity
            });

            return bullet;
        });

        series.nodes.labels.template.setAll({
            textType: "regular",
            fill: root.interfaceColors.get("background"),
            fontSize: "1.1em",
            radius: -5
        });

        series.nodes.bullets.push(function (_root, _series, dataItem) {
            return am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    radius: 20,
                    fill: dataItem.get("fill")
                })
            });
        });

        series.children.moveValue(series.bulletsContainer, 0);

        // Set data
        series.data.setAll(chordDiagramData);

        // Make stuff animate on load
        series.appear(1000, 100);

        return () => root && root.dispose();
    }, [mode, theme.palette.customColors]);

    return (<><div id="chorddiagramchartdiv" style={{ width: "100%", height: "650px" }}></div></>);
};