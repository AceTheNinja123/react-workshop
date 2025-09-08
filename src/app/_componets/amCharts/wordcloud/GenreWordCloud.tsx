"use client";
import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
interface dataType { text: string; value: number; sentiment: string; polarities: string; color: string; }
const movieGenresWordCloud: dataType[] = [
    { text: "Action", value: 50, sentiment: "positive", polarities: "high", color: "#E53935" },
    { text: "Adventure", value: 42, sentiment: "positive", polarities: "medium", color: "#FB8C00" },
    { text: "Comedy", value: 45, sentiment: "positive", polarities: "medium", color: "#FFB300" },
    { text: "Romantic Comedy", value: 28, sentiment: "positive", polarities: "low", color: "#F06292" },
    { text: "Drama", value: 40, sentiment: "neutral", polarities: "medium", color: "#8E24AA" },
    { text: "Historical Drama", value: 25, sentiment: "neutral", polarities: "low", color: "#AB47BC" },
    { text: "Horror", value: 30, sentiment: "negative", polarities: "high", color: "#3949AB" },
    { text: "Psychological Horror", value: 20, sentiment: "negative", polarities: "high", color: "#1A237E" },
    { text: "Romance", value: 35, sentiment: "positive", polarities: "low", color: "#D81B60" },
    { text: "Sci-Fi", value: 38, sentiment: "positive", polarities: "high", color: "#00ACC1" },
    { text: "Cyberpunk", value: 18, sentiment: "neutral", polarities: "medium", color: "#00897B" },
    { text: "Fantasy", value: 36, sentiment: "neutral", polarities: "medium", color: "#43A047" },
    { text: "Epic Fantasy", value: 22, sentiment: "positive", polarities: "medium", color: "#2E7D32" },
    { text: "Thriller", value: 32, sentiment: "negative", polarities: "high", color: "#F4511E" },
    { text: "Crime Thriller", value: 27, sentiment: "negative", polarities: "high", color: "#BF360C" },
    { text: "Documentary", value: 24, sentiment: "neutral", polarities: "low", color: "#6D4C41" },
    { text: "Biographical", value: 20, sentiment: "neutral", polarities: "medium", color: "#5D4037" },
    { text: "Animation", value: 34, sentiment: "positive", polarities: "medium", color: "#7CB342" },
    { text: "Family", value: 30, sentiment: "positive", polarities: "low", color: "#C0CA33" },
    { text: "Musical", value: 26, sentiment: "positive", polarities: "medium", color: "#FF7043" },
    { text: "War", value: 19, sentiment: "neutral", polarities: "high", color: "#8D6E63" },
    { text: "Western", value: 21, sentiment: "neutral", polarities: "medium", color: "#A1887F" },
    { text: "Mystery", value: 29, sentiment: "neutral", polarities: "medium", color: "#3949AB" },
    { text: "Sports", value: 23, sentiment: "positive", polarities: "low", color: "#1E88E5" },
    { text: "Superhero", value: 37, sentiment: "positive", polarities: "high", color: "#1976D2" },
];

const WordCloudChart = () => {
    useLayoutEffect(() => {
        const tooltipHTML = '<strong>{text}</strong><br>Occurrences: <b>{value}</b><br><b>{polarities}</b>';
        const wordCloudRoot = am5.Root.new("wordCloudChart");

        // Set themes
        wordCloudRoot.setThemes([am5themes_Animated.new(wordCloudRoot)]);

        const zoomableContainer = wordCloudRoot.container.children.push(am5.ZoomableContainer.new(wordCloudRoot, { height: am5.p100, wheelable: true, pinchZoom: true, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }));

        // Set screen reader text for the chart
        zoomableContainer.set("ariaLabel", "A Word Cloud chart that display Sentiment - Overview");

        const zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(wordCloudRoot, { target: zoomableContainer }));

        // Add series
        const series = zoomableContainer.contents.children.push(am5wc.WordCloud.new(wordCloudRoot, {
            minWordLength: 2,
            minFontSize: am5.percent(7),
            maxFontSize: am5.percent(100),
            autoFit: true,
            categoryField: "text",
            valueField: "value",
            fillField: "color",
            interactive: true,
            exportable: true,
            rotation: 0,
            angles: [0],
            interpolationDuration: 0.1
        }));

        // Configure labels
        series.labels.template.setAll({
            tooltipHTML: tooltipHTML,
            fontWeight: "bold",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            fontFamily: "Plus Jakarta Sans"
        });

        series.data.setAll(movieGenresWordCloud)

        //Exporting
        const exporting = am5plugins_exporting.Exporting.new(wordCloudRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(wordCloudRoot, { useDefaultCSS: false }),
            filePrefix: "WordCloud_Chart",
            //title: "Review Rating Column Chart", 
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { zoomTools.hide(); });
        exporting.events.on("exportfinished", function () { zoomTools.show(); });

        return () => wordCloudRoot && wordCloudRoot.dispose();
    }, []);

    return (
        <><div id="wordCloudChart" style={{ width: "100%", height: "740px" }}></div></>
    );
};
export default WordCloudChart;