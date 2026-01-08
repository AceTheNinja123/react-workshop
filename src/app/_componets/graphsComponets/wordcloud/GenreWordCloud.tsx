/**
 * WordCloudChart Component
 *
 * Renders a word cloud chart using amCharts 5, visualizing movie genres and their occurrences.
 *
 * Features:
 * - Interactive word cloud with zoom, pan, and tooltips.
 * - Accessible: includes ARIA labels for screen readers.
 * - Exportable: users can export the chart as PNG, JPG, or PDF.
 * - Customizable tooltips showing genre, occurrences, and polarities.
 *
 * Usage:
 *   import WordCloudChart from './GenreWordCloud';
 *   <WordCloudChart />
 *
 * Implementation:
 * - Uses useLayoutEffect to initialize and dispose of the amCharts root.
 * - The chart is rendered inside a <div id="wordCloudChart">.
 * - Applies the Animated theme and enables zoom tools.
 * - Configures the word cloud with custom font, padding, and tooltips.
 * - Exports are handled via amCharts exporting plugin, hiding zoom tools during export.
 *
 * Props: None
 * Data: Uses `movieGenresWordCloud` from './wordCloudData' as the data source.
 * Accessibility: The chart container has an ariaLabel describing its purpose.
 * Cleanup: Disposes of the amCharts root on component unmount to prevent memory leaks.
 */
"use client";
import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { movieGenresWordCloud} from "./wordCloudData"

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