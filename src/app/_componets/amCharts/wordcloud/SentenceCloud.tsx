"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import {sentenceCloudDataType, reviewsData} from "./wordCloudData"

export default function AmChartWordcloud() {
    const theme = useTheme();
    const mode = theme.palette.mode;

    useLayoutEffect(() => {
        const sentenceCloudRoot = am5.Root.new("sentenceCloudChart");
        // Set themes
        sentenceCloudRoot.setThemes([am5themes_Animated.new(sentenceCloudRoot)]);

        const zoomableContainer = sentenceCloudRoot.container.children.push(am5.ZoomableContainer.new(sentenceCloudRoot, { height: am5.p100, wheelable: true, pinchZoom: true, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }));

        // Set screen reader text for the chart
        zoomableContainer.set("ariaLabel", "A Sentence Cloud chart");

        const zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(sentenceCloudRoot, { target: zoomableContainer }));

        // Add series
        const series = zoomableContainer.contents.children.push(am5wc.WordCloud.new(sentenceCloudRoot, {
            maxCount: 100,
            minWordLength: 2,
            autoFit: true,
            minFontSize: am5.percent(20),
            maxFontSize: am5.percent(100),
            categoryField: "category",
            valueField: "value",
            angles: [0],
            exportable: true,
            rotation: 0,
        }));

        // Configure labels
        series.labels.template.setAll({
            fontWeight: "bold",
            fontFamily: "Plus Jakarta Sans",
            tooltipText: "[bold]Rating:[/] {value} out of 5",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            interactive: true,
            cursorOverStyle: "pointer",
            setStateOnChildren: true,
        });

        series.labels.template.adapters.add("text", function (text, target) {
            // Ensure text is defined and is a string
            if (text && typeof text === 'string') {
                const dataItem = target.dataItem;
                const dataContext = dataItem?.dataContext as sentenceCloudDataType;
                const textData = dataContext.category;
                // Check if there is already a newline in the text
                if (!textData.includes("\n")) {
                    // Add a newline based on a condition, like every 5 words
                    const words = textData.split(" ");
                    if (words.length > 5) {
                        const midpoint = Math.floor(words.length / 2);
                        words[midpoint] += "\n";  // Insert a newline at the midpoint
                    }
                    return words.join(" ");
                }
            }
            return text;  // If text is undefined or already contains a newline, return it as is
        });

        series.labels.template.events.on("dataitemchanged", function (event) {
            const label = event.target;
            const dataItem = label.dataItem;
            const dataContext = dataItem?.dataContext as sentenceCloudDataType;
            if (dataContext) {
                // Create the RoundedRectangle background
                label.set("background", am5.RoundedRectangle.new(sentenceCloudRoot, {
                    fill: am5.color(dataContext.color),
                    fillOpacity: 0.5,
                    stroke: am5.color(0x000000),
                    strokeWidth: 1,
                    strokeOpacity: 1,
                }));
            }
        });
        series.labels.template.states.create("hover", { fillOpacity: 1, });

        series.data.setAll(reviewsData)

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(sentenceCloudRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(sentenceCloudRoot, { useDefaultCSS: false }),
            filePrefix: "SentenceCloud_Chart",
            //title: "Review Rating Column Chart", 
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { zoomTools.hide(); });
        exporting.events.on("exportfinished", function () { zoomTools.show(); });

        return () => { sentenceCloudRoot && sentenceCloudRoot.dispose() };
    }, [mode]);

    return (<><div id="sentenceCloudChart" style={{ width: "100%", height: "700px" }}></div></>);
};