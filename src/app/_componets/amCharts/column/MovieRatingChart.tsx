
'use client'
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';

//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useTranslation } from "react-i18next";

//DSR = Dash Service Rating
interface dataType { category: string; y: number; name: string; }
interface data { movieData: Array<dataType>; lowNum: number; highNum: number; averageNum: number }

const MovieRatingChart = ({ movieData, lowNum, highNum, averageNum, }: data) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const mode = theme.palette.mode;
    const customColors = theme.palette.customColors;

    useLayoutEffect(() => {
        const MovieRatingChartRoot = am5.Root.new("movieRatingDiv");
        const tooltipHTML = '<small><b>{name}</b></small><table style="width:100%;"><tr><td style="">' + t('RATING') + ':  </td><td style="text-align: right"><b>{y}%</b></td></tr><tr><td style=""></table>'

        // Set themes
        MovieRatingChartRoot.setThemes([am5themes_Animated.new(MovieRatingChartRoot)]);

        // Create chart
        const chart = MovieRatingChartRoot.container.children.push(am5xy.XYChart.new(MovieRatingChartRoot, { panX: false, panY: false, wheelX: "none", wheelY: "none", paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 40, layout: MovieRatingChartRoot.horizontalLayout, }));

        // Set screen reader text for the chart
        chart.set("ariaLabel", "A Column chart that shows Primary Service Ratings");

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);

        // Create axes
        const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(MovieRatingChartRoot, { categoryField: "category", renderer: am5xy.AxisRendererY.new(MovieRatingChartRoot, { minGridDistance: 10, minorGridEnabled: true }) }));
        yAxis.get("renderer").grid.template.set("location", 1);
        yAxis.get("renderer").labels.template.setAll({ fontSize: 12, location: 0.5, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff), })
        yAxis.data.setAll(movieData);
        yAxis.get("renderer").labels.template.adapters.add("text", (text, target) => {
            const dataItem = target.dataItem;
            const dataContext = dataItem?.dataContext as dataType;
            return dataContext?.name ? `${dataContext?.name}` : text;
        });
        const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(MovieRatingChartRoot, { min: 0, max: 100, renderer: am5xy.AxisRendererX.new(MovieRatingChartRoot, {}) }));
        xAxis.get("renderer").labels.template.setAll({ fontSize: 12, location: 0.5, fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff) })

        //Settings for tooltip
        const tooltip = am5.Tooltip.new(MovieRatingChartRoot, { readerAnnounce: true, pointerOrientation: "horizontal", autoTextColor: false, });
        tooltip.label.setAll({ fill: mode == "light" ? am5.color(0x000000) : am5.color(0xffffff), });

        // Add series
        const series = chart.series.push(am5xy.ColumnSeries.new(MovieRatingChartRoot, {
            idField: "category",
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "y",
            categoryYField: "category",
            clustered: true,
            sequencedInterpolation: true,

            fill: am5.color(0x6794dc),
            tooltip: tooltip,
        }));

        series.data.setAll(movieData);
        series.columns.template.adapters.add("fill", (fill, target) => {
            return am5.color(customColors[series.columns.indexOf(target)]);
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
            return am5.color(customColors[series.columns.indexOf(target)]);
        });
        series.columns.template.setAll({ tooltipHTML: tooltipHTML, width: am5.percent(90), strokeOpacity: 0, cornerRadiusTR: 5, cornerRadiusBR: 5 });
        series.appear(1000, 100);

        // Create axis ranges
        function createRange(value: number | undefined, endValue: number | undefined, color: am5.Color | undefined) {
            const rangeDataItem = xAxis.makeDataItem({ value: value, endValue: endValue });
            const range = xAxis.createAxisRange(rangeDataItem);

            /*range.get("label").setAll({
                fill: am5.color(0xffffff), 
                text: value, 
                background: am5.RoundedRectangle.new(NPSGroupChartRoot, {fill: color})
            });*/

            const grid = range.get("grid"); // Retrieve the grid object
            if (grid) { grid.setAll({ stroke: color, strokeOpacity: 1, strokeDasharray: [15], strokeWidth: 2, location: 1, }); }
            else { console.warn("Grid is undefined for the range"); }
        }

        if (lowNum) createRange(lowNum, undefined, am5.color('#e55d5d'));
        if (averageNum) createRange(averageNum, undefined, am5.color('#539BFF'));
        if (highNum) createRange(highNum, undefined, am5.color('#7dc691'));
        // if (rootScope.primaryTarget) createRange(rootScope.primaryTarget, undefined, am5.color("#70b2b4"));
        chart.set("cursor", am5xy.XYCursor.new(MovieRatingChartRoot, { behavior: "none", xAxis: xAxis, yAxis: yAxis }));

        // Make stuff animate on load
        chart.appear(100, 1000);

        // Exporting
        const exporting = am5plugins_exporting.Exporting.new(MovieRatingChartRoot, {
            menu: am5plugins_exporting.ExportingMenu.new(MovieRatingChartRoot, { useDefaultCSS: false }),
            filePrefix: "Movie_Rating_Chart",
            pngOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            jpgOptions: { minWidth: 1000, maxWidth: 2000, minHeight: 1000, maxHeight: 5000 },
            pdfOptions: { pageSize: "A4", pageOrientation: "landscape", pageMargins: [30, 30, 30, 30], addURL: false }
        });

        exporting.events.on("exportstarted", function () { });
        exporting.events.on("exportfinished", function () { });

        return () => MovieRatingChartRoot && MovieRatingChartRoot.dispose();
    }, [movieData, lowNum, highNum, averageNum, mode, t]);
    return (<div id="movieRatingDiv" style={{ width: "100%", height: "680px" }}></div>);
};
export default MovieRatingChart;