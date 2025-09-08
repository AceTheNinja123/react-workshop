"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

interface dataType { category: string; value: number; color: string; }

    // const reviewsData1 = [
    //     { category: "The room was\nspacious and clean, \nbut the view was average", value: 4.1, color: "#7ec991" },
    //     { category: "The service was\nslow and unresponsive, \ndisappointing experience", value: 2.3, color: "#e55d5d" },
    //     { category: "Breakfast was\nincluded but it\nwas just okay", value: 3.0, color: "#c9c9cd" },
    //     { category: "Loved the\nlocation, close to\nthe city center", value: 4.5, color: "#7ec991" },
    //     { category: "Uncomfortable beds\nand noisy at night, \npoor sleep quality", value: 1.8, color: "#e55d5d" },
    //     { category: "Average stay, \nbut the staff were\nhelpful", value: 3.2, color: "#c9c9cd" },
    //     { category: "The pool was\nfantastic and\nwell-maintained", value: 4.7, color: "#7ec991" },
    //     { category: "Room was small\nand smelled of\ndamp", value: 2.0, color: "#e55d5d" },
    //     { category: "Convenient location, \nbut the parking\nwas limited", value: 3.3, color: "#c9c9cd" },
    //     { category: "The food at\nthe restaurant was\ndelicious!", value: 4.8, color: "#7ec991" },
    //     { category: "Terrible Wi-Fi\nconnection, couldn't\nwork properly", value: 1.9, color: "#e55d5d" },
    //     { category: "Nice atmosphere, \nthough the room decor\nfelt outdated", value: 3.5, color: "#c9c9cd" },
    //     { category: "Cleanliness and\nhospitality were\ntop-notch", value: 4.6, color: "#7ec991" },
    //     { category: "The shower was\ndifficult to use, \nand the water\npressure was low", value: 2.4, color: "#e55d5d" },
    //     { category: "Good for the price, \nbut don't expect\nluxury", value: 3.4, color: "#c9c9cd" },
    //     { category: "The staff went\nabove and beyond\nto help us", value: 4.9, color: "#7ec991" },
    //     { category: "The air conditioning\nwasn't working\nproperly", value: 2.1, color: "#e55d5d" },
    //     { category: "Had an\naverage stay, \nno major issues", value: 3.0, color: "#c9c9cd" },
    //     { category: "The view from\nthe balcony was\nbreathtaking", value: 4.8, color: "#7ec991" },
    //     { category: "The walls were\nthin, I could\nhear my neighbors", value: 2.2, color: "#e55d5d" }
    // ];

    const reviewsData2 = [
        { category: "The room was spacious and clean, but the view was average", value: 4.1, color: "#7ec991" },
        { category: "The service was slow and unresponsive, disappointing experience", value: 2.3, color: "#e55d5d" },
        { category: "Breakfast was included but it was just okay", value: 3.0, color: "#c9c9cd" },
        { category: "Loved the location, close to the city center", value: 4.5, color: "#7ec991" },
        { category: "Uncomfortable beds and noisy at night, poor sleep quality", value: 1.8, color: "#e55d5d" },
        { category: "Average stay, but the staff were helpful", value: 3.2, color: "#c9c9cd" },
        { category: "The pool was fantastic and well-maintained", value: 4.7, color: "#7ec991" },
        { category: "Room was small and smelled of damp", value: 2.0, color: "#e55d5d" },
        { category: "Convenient location, but the parking was limited", value: 3.3, color: "#c9c9cd" },
        { category: "The food at the restaurant was delicious!", value: 4.8, color: "#7ec991" },
        { category: "Terrible Wi-Fi connection, couldn't work properly", value: 1.9, color: "#e55d5d" },
        { category: "Nice atmosphere, though the room decor felt outdated", value: 3.5, color: "#c9c9cd" },
        { category: "Cleanliness and hospitality were top-notch", value: 4.6, color: "#7ec991" },
        { category: "The shower was difficult to use, and the water pressure was low", value: 2.4, color: "#e55d5d" },
        { category: "Good for the price, but don't expect luxury", value: 3.4, color: "#c9c9cd" },
        { category: "The staff went above and beyond to help us", value: 4.9, color: "#7ec991" },
        { category: "The air conditioning wasn't working properly", value: 2.1, color: "#e55d5d" },
        { category: "Had an average stay, no major issues", value: 3.0, color: "#c9c9cd" },
        { category: "The view from the balcony was breathtaking", value: 4.8, color: "#7ec991" },
        { category: "The walls were thin, I could hear my neighbors", value: 2.2, color: "#e55d5d" }
    ];

export default function AmChartWordcloud() {
    const theme = useTheme();
    const mode = theme.palette.mode;


    useLayoutEffect(() => {
        const sentenceCloudRoot = am5.Root.new("sentenceCloudChart");
        // const tooltipHTML = '<strong>{category}</strong><br> Rating:<b> {value}</b>';
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
                const dataContext = dataItem?.dataContext as dataType;
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
            const dataContext = dataItem?.dataContext as dataType;
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

        series.data.setAll(reviewsData2)

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

    return (<><div id="sentenceCloudChart" style={{ width: "100%", height: "500px" }}></div></>);
};