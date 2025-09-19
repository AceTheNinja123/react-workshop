import type React from 'react';
import { uniqueId } from "lodash";

export interface MenuitemsType {
    [x: string]: unknown;
    id?: string;
    navlabel?: boolean;
    subheader?: string;
    title?: string;
    icon?: React.ElementType;
    href?: string | object;
    children?: MenuitemsType[];
}
import { IconLayoutDashboardFilled, IconGraphFilled, IconDeviceGamepadFilled } from "@tabler/icons-react";

export const MenuItems: MenuitemsType[] = [
    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconLayoutDashboardFilled,
        href: '/dashboard',
    },
    {
        id: uniqueId(),
        title: 'Graphs',
        icon: IconGraphFilled,
        href: '/graphs',
        children: [
            {
                id: uniqueId(),
                title: 'Line Graphs',
                href: '/graphs/lineGraphs',
            },
            {
                id: uniqueId(),
                title: 'Column Graphs',
                href: '/graphs/columnGraphs',
            },
            {
                id: uniqueId(),
                title: 'Donut Graphs',
                href: '/graphs/donutGraphs',
            },
            {
                id: uniqueId(),
                title: 'Map Graphs',
                href: '/graphs/mapGraphs',
            },
            {
                id: uniqueId(),
                title: 'Word Cloud Graphs',
                href: '/graphs/wordCloudGraphs',
            },
            {
                id: uniqueId(),
                title: 'Radial Bar Graphs',
                href: '/graphs/radialBarGraphs',
            },
            {
                id: uniqueId(),
                title: 'Group Graphs',
                href: '/graphs/groupGraphs',
            },
            {
                id: uniqueId(),
                title: 'Hierarchy Graphs',
                href: '/graphs/hierarchyGraphs',
            },
            {
                id: uniqueId(),
                title: 'Other Graphs',
                href: '/graphs/otherGraphs',
            },
        ]
    },
    {
        id: uniqueId(),
        title: 'Games',
        icon: IconDeviceGamepadFilled,
        href: '/games',
    }
]