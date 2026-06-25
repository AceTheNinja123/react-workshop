/**
 * Menu component for the PaintApp.
 *
 * This component provides controls for adjusting the drawing parameters
 * such as brush color, line width, and line opacity.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {(color: string) => void} props.setLineColor - Callback to set the line color.
 * @param {(width: number) => void} props.setLineWidth - Callback to set the line width.
 * @param {(opacity: number) => void} props.setLineOpacity - Callback to set the line opacity.
 * @returns {JSX.Element} A Box containing the menu controls.
 *
 * @example
 * // Usage in PaintApp:
 * <Menu
 *   setLineColor={setLineColor}
 *   setLineWidth={setLineWidth}
 *   setLineOpacity={setLineOpacity}
 * />
 *
 * @remarks
 * - Uses Material-UI components like `Box`, `Slider`, `TextField`, and `Typography`.
 * - `useTheme` hook is used to access the current Material-UI theme for styling.
 */

import React from "react";
import { Box, Slider, TextField, Typography, useTheme } from "@mui/material";

interface MenuProps {
    setLineColor: (color: string) => void;
    setLineWidth: (width: number) => void;
    setLineOpacity: (opacity: number) => void;
}

const Menu = ({ setLineColor, setLineWidth, setLineOpacity, }: MenuProps) => {
    const theme = useTheme();
    return (
        <Box className="paintAppMenu" sx={{ display: 'flex', gap: 2, padding: 2, backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText,}}>
            {/* Brush Color */}
            <Typography variant="subtitle1" >Brush Color</Typography>
            <TextField
                type="color"
                fullWidth
                onChange={(e) => setLineColor(e.target.value)}
                sx={{ width: 80, "& input": { width: 80, height: 30, padding: 0, }, }}
            />

            {/* Brush Width */}
            <Typography variant="subtitle1" >Brush Width</Typography>
            <Slider
                min={3}
                max={20}
                defaultValue={5}
                size="small"
                sx={{ width: 100 }}
                valueLabelDisplay="auto"
                onChange={(_, value) => setLineWidth(value as number)}
            />

            {/* Brush Opacity */}
            <Typography variant="subtitle1">Brush Opacity</Typography>
            <Slider
                min={1}
                max={100}
                defaultValue={100}
                size="small"
                sx={{ width: 100 }}
                valueLabelDisplay="auto"
                onChange={(_, value) => setLineOpacity((value as number) / 100)}
            />
        </Box>
    );
};

export default Menu;