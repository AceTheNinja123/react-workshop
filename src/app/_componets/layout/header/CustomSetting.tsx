"use client";
import React, { type FC, useState, } from 'react';
import { Box, Typography, Tooltip, Stack, Slider, Divider, Drawer, IconButton, styled, type BoxProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import { useTranslation } from "react-i18next";
import { IconX, IconSettings, IconCheck } from '@tabler/icons-react';

import useStore, { type Store } from "@/state/store";
import Scrollbar from "@/app/_componets/custom-scroll/Scrollbar";

const SidebarWidth = "400px";
interface colors { id: number; bgColor: string; disp?: string; }
const Customizer: FC = () => {
    const { t } = useTranslation();
    const [showDrawer, setShowDrawer] = useState(false);
    const customizer = useStore((state: Store) => state.customizer);

    const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
        boxShadow: theme.shadows[8],
        padding: "20px",
        cursor: "pointer",
        justifyContent: "center",
        display: "flex",
        transition: "0.1s ease-in",
        border: "1px solid rgba(145, 158, 171, 0.12)",
        "&:hover": { transform: "scale(1.05)", },
    }));

    const thColors: colors[] = [
        { id: 1, bgColor: "#5D87FF", disp: "BLUE_THEME", },
        { id: 2, bgColor: "#4CAF50", disp: "GREEN_THEME", },
        { id: 3, bgColor: "#9C27B0", disp: "PURPLE_THEME", },
        { id: 4, bgColor: "#F44336", disp: "RED_THEME", },
        { id: 5, bgColor: "#FF9800", disp: "ORANGE_THEME", },
        { id: 6, bgColor: "#EC4899", disp: "PINK_THEME", },
    ];

    return (
        <div>
            <Tooltip title="Settings">
                <IconButton
                    color="inherit"
                    aria-label="settings"
                    onClick={() => setShowDrawer(true)}
                >
                    <IconSettings stroke={1.5} />
                </IconButton>
            </Tooltip>
            <Drawer anchor="right" open={showDrawer} onClose={() => setShowDrawer(false)} sx={{ width: SidebarWidth, }} >
                {/* ------------------------------------------- */}
                {/* ------------ Customizer Sidebar ------------- */}
                {/* ------------------------------------------- */}
                <Scrollbar sx={{ height: "calc(100vh - 5px)" }}>
                    <Box
                        p={2}
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems="center"
                    >
                        <Typography variant="h4">{t('CUSTOMSETTINGS')}</Typography>
                        <IconButton color="inherit" onClick={() => setShowDrawer(false)}>
                            <IconX size="1rem" />
                        </IconButton>
                    </Box>
                    <Divider />
                    <Box p={3}>
                        {/* ------------------------------------------- */}
                        {/* ------------ Dark light theme setting ------------- */}
                        {/* ------------------------------------------- */}
                        <Typography variant="h6" gutterBottom>{t('THEMEOPT')}</Typography>
                        <Stack direction={"row"} gap={2} my={2}>
                            <StyledBox
                                onClick={() => customizer.setMode("light")}
                                display="flex"
                                gap={1}
                            >
                                <WbSunnyTwoToneIcon color={customizer.activeMode === "light" ? "primary" : "inherit"} />
                                Light
                            </StyledBox>
                            <StyledBox
                                onClick={() => customizer.setMode("dark")}
                                display="flex"
                                gap={1}
                            >
                                <DarkModeTwoToneIcon color={customizer.activeMode === "dark" ? "primary" : "inherit"} />
                                Dark
                            </StyledBox>
                        </Stack>
                        <Box pt={3} />
                        {/* ------------------------------------------- */}
                        {/* ------------ Theme Color setting ------------- */}
                        {/* ------------------------------------------- */}
                        <Typography variant="h6" gutterBottom>
                            {t('THEMECOL')}
                        </Typography>
                        <Grid container spacing={2}>
                            {thColors.map((thcolor) => (
                                <Grid size={4} key={thcolor.id}>
                                    <StyledBox onClick={() => thcolor.disp && customizer.setTheme(thcolor.disp)}>
                                        <Tooltip title={`${thcolor.disp}`} placement="top">
                                            <Box
                                                sx={{
                                                    backgroundColor: thcolor.bgColor,
                                                    width: "25px",
                                                    height: "25px",
                                                    borderRadius: "50px",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    display: "flex",
                                                    color: "white",
                                                }}
                                                aria-label={`${thcolor.bgColor}`}
                                            >
                                                {customizer.activeTheme === thcolor.disp ? (<IconCheck width={13} />) : ("")}
                                            </Box>
                                        </Tooltip>
                                    </StyledBox>
                                </Grid>
                            ))}
                        </Grid>
                        <Box pt={4} />

                        <Slider
                            size="small"
                            value={customizer.borderRadius}
                            aria-label="Small"
                            min={4}
                            max={24}
                            onChange={(event, value) => !Array.isArray(value) && customizer.setBorderRadius(value)}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </Scrollbar>
            </Drawer>
        </div>
    );
};

export default Customizer;