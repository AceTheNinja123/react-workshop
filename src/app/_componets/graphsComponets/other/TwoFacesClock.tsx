"use client";
import React, { useLayoutEffect } from "react";
import { useTheme } from '@mui/material/styles';
//amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function TwoFacesClock() {
    const theme = useTheme();
    const mode = theme.palette.mode;

    useLayoutEffect(() => {
        let TwoFacesClockRoot = am5.Root.new("TwoFacesClockDiv");
        // Set themes
        TwoFacesClockRoot.setThemes([am5themes_Animated.new(TwoFacesClockRoot)]);

        // Create chart
        let chart = TwoFacesClockRoot.container.children.push(am5radar.RadarChart.new(TwoFacesClockRoot, { panX: false, panY: false, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }));

        // Create axis and its renderer
        let axisRenderer = am5radar.AxisRendererCircular.new(TwoFacesClockRoot, {
            innerRadius: -10,
            stroke: mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000),
            strokeOpacity: 1,
            strokeWidth: 8,
            minGridDistance: 10
        });

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(TwoFacesClockRoot, {
            maxDeviation: 0,
            min: 0,
            max: 12,
            strictMinMax: true,
            renderer: axisRenderer,
            maxPrecision: 0
        }));

        // second axis
        let secondAxisRenderer = am5radar.AxisRendererCircular.new(TwoFacesClockRoot, {
            innerRadius: -10,
            radius: am5.percent(40),
            strokeOpacity: 0,
            minGridDistance: 1
        });

        let secondXAxis = chart.xAxes.push(am5xy.ValueAxis.new(TwoFacesClockRoot, {
            maxDeviation: 0,
            min: 0,
            max: 60,
            strictMinMax: true,
            renderer: secondAxisRenderer,
            maxPrecision: 0
        }));


        // hides 0 value
        axisRenderer.labels.template.setAll({
            minPosition: 0.02,
            textType: "adjusted",
            inside: true,
            radius: 25,
            fill: mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000),
        });
        axisRenderer.grid.template.set("strokeOpacity", 1);

        secondAxisRenderer.labels.template.setAll({ forceHidden: true, fill: mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000) });
        secondAxisRenderer.grid.template.setAll({ forceHidden: true });
        secondAxisRenderer.ticks.template.setAll({
            strokeOpacity: 1,
            minPosition: 0.01,
            visible: true,
            inside: true,
            length: 10,
            stroke: mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000),
        });

        // Add clock hands
        // hour
        let hourDataItem = xAxis.makeDataItem({});

        let hourHand = am5radar.ClockHand.new(TwoFacesClockRoot, {
            radius: am5.percent(70),
            topWidth: 14,
            bottomWidth: 14,
            innerRadius: am5.percent(43),
            pinRadius: 0,
            layer: 5,
        });
        hourHand.hand.set("fill", mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000));
        hourHand.pin.set("fill", mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000));

        hourDataItem.set("bullet", am5xy.AxisBullet.new(TwoFacesClockRoot, { sprite: hourHand }));

        xAxis.createAxisRange(hourDataItem);

        hourDataItem.get("grid")?.set("visible", false);

        // minutes
        let minutesDataItem = xAxis.makeDataItem({});

        let minutesHand = am5radar.ClockHand.new(TwoFacesClockRoot, {
            radius: am5.percent(85),
            topWidth: 10,
            bottomWidth: 10,
            innerRadius: am5.percent(43),
            pinRadius: 0,
            layer: 5
        })
        minutesHand.hand.set("fill", mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000));
        minutesHand.pin.set("fill", mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000));

        minutesDataItem.set("bullet", am5xy.AxisBullet.new(TwoFacesClockRoot, { sprite: minutesHand }));

        xAxis.createAxisRange(minutesDataItem);

        minutesDataItem.get("grid")?.set("visible", false);

        // seconds
        let secondsDataItem = xAxis.makeDataItem({});

        let secondsHand = am5radar.ClockHand.new(TwoFacesClockRoot, {
            radius: am5.percent(40),
            innerRadius: -10,
            topWidth: 5,
            bottomWidth: 5,
            pinRadius: 0,
            layer: 5,
        })
        secondsHand.hand.set("fill", am5.color(0xff0000));
        secondsHand.pin.set("fill", mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000));

        secondsDataItem.set("bullet", am5xy.AxisBullet.new(TwoFacesClockRoot, { sprite: secondsHand }));

        xAxis.createAxisRange(secondsDataItem);

        secondsDataItem.get("grid")?.set("visible", false);

        // week label
        let label = chart.radarContainer.children.push(am5.Label.new(TwoFacesClockRoot, {fontSize: "2em",centerX: am5.p50,centerY: am5.p50}));

        setInterval(function () { updateHands(300) }, 1000);

        function updateHands(duration: number) {
            // get current date
            let date = new Date();
            let hours = date.getHours();

            if (hours > 12) { hours -= 12; }

            let minutes = date.getMinutes();
            let seconds = date.getSeconds();

            // set hours
            hourDataItem.set("value", hours + minutes / 60 + seconds / 60 / 60);
            // set minutes
            minutesDataItem.set("value", 12 * (minutes + seconds / 60) / 60);
            // set seconds
            let current = secondsDataItem.get("value");
            let value = 12 * date.getSeconds() / 60;
            // otherwise animation will go from 59 to 0 and the hand will move backwards
            if (value == 0) { value = 11.999; }
            // if it's more than 11.99, set it to 0
            if (current && current > 11.99) { current = 0; }
            secondsDataItem.animate({
                key: "value",
                from: current,
                to: value,
                duration: duration
            });

            label.set("text", chart.getDateFormatter().format(date, "MMM dd"))
            label.set("fill", mode === 'dark' ? am5.color(0xffffff) : am5.color(0x000000));
        }

        updateHands(0);

        // Make stuff animate on load
        chart.appear(1000, 100);

        // update on visibility
        document.addEventListener("visibilitychange", function () { updateHands(0) });

        return () => TwoFacesClockRoot && TwoFacesClockRoot.dispose();
    }, [mode, theme.palette.customColors]);

    return (<><div id="TwoFacesClockDiv" style={{ width: "100%", height: "650px" }}></div></>);
};