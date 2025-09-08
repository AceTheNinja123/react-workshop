"use client";
import React from "react";
import { AppBar, IconButton, Typography, Toolbar } from '@mui/material';
import { IconBaselineDensityMedium } from "@tabler/icons-react";
// import DarkModeSwitch from "@/app/_componets/shared/button/DarkModeSwitch";
import useStore from "@/state/store";
import CustomSetting from "./CustomSetting";
const Header = () => {
    const customizer = useStore((state) => state.customizer);

    return (
        <AppBar position="static" color="default" sx={{ zIndex: 1200 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={() => customizer.toggleSidebar()}
                >
                    <IconBaselineDensityMedium size="20" />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> {customizer.pageTitle} </Typography>
                {/* <DarkModeSwitch /> */}
                <CustomSetting />
            </Toolbar>
        </AppBar>
    );
};
export default Header;