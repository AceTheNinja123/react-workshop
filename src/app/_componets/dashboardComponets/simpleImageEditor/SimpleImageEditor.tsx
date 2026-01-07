/**
 * SimpleImageEditor component for editing images with real-time filter adjustments.
 * 
 * Provides an interactive image editor with the following features:
 * - Image upload functionality
 * - Real-time filter adjustments (brightness, contrast, grayscale, hue rotation, saturation, sepia)
 * - Canvas-based rendering for applying CSS filters to images
 * - Save edited image as PNG
 * - Reset filters to default values
 * 
 * @component
 * @returns {React.ReactElement} A Material-UI Box containing the image editor interface with
 *                               AppBar controls, image canvas, and filter sliders
 * 
 * @example
 * // Basic usage
 * <SimpleImageEditor />
 * 
 * @remarks
 * - Uses a hidden img element with canvas for rendering filtered images
 * - Inspired by GeeksforGeeks tutorial on JavaScript image editing
 * - Supports the following filters with adjustable ranges:
 *   - Brightness: 0-200%
 *   - Contrast: 0-200%
 *   - Grayscale: 0-100%
 *   - Saturation: 0-100%
 *   - Sepia: 0-100%
 *   - Hue Rotate: 0-360 degrees
 */
import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, AppBar, Toolbar, Grid, Slider, Button, useTheme } from "@mui/material";
import { IconPhoto, } from "@tabler/icons-react";
/* Taken inspiration from this: https://www.geeksforgeeks.org/javascript/creating-a-simple-image-editor-using-javascript/ */

const SimpleImageEditor = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [filters, setFilters] = useState({ brightness: 100, contrast: 100, grayscale: 0, hueRotate: 0, saturate: 100, sepia: 0, });
    const theme = useTheme();
    const imageRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Apply filters whenever filters or image changes
    useEffect(() => {
        if (!canvasRef.current || !imageRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imageRef.current;
        if (!img.complete) return; // wait for load

        // Match canvas size to image
        canvas.width = img.width;
        canvas.height = img.height;

        const filterString = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) grayscale(${filters.grayscale}%) saturate(${filters.saturate}%) sepia(${filters.sepia}%) hue-rotate(${filters.hueRotate}deg)`;

        ctx.filter = filterString;
        ctx.drawImage(img, 0, 0);

    }, [filters, imageSrc]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { setImageSrc(URL.createObjectURL(file)); }
    };

    const handleSliderChange = (key: keyof typeof filters) => (_event: Event, value: number | number[]) => { setFilters((prev) => ({ ...prev, [key]: value as number })); };

    const resetFilters = () => setFilters({ brightness: 100, contrast: 100, grayscale: 0, hueRotate: 0, saturate: 100, sepia: 0, });

    const saveImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "edited_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <Box sx={{ textAlign: "center", p: 2, width: "100%", height: "100%", border: "2px solid", borderColor: theme.palette.primary.main }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left", }}>Simple Image Filters</Typography>
                    <Button color="inherit" onClick={resetFilters}>Reset</Button>
                    <Button color="inherit" onClick={saveImage}>Save</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 2, mb: 3, minHeight: 300, }}>
                {imageSrc ? (
                    <>
                        {/* Hidden <img> for canvas drawing */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            alt="Hidden copy for canvas"
                            style={{ display: "none", maxWidth: "100%", maxHeight: "300px", }}
                            onLoad={() => setFilters((prev) => ({ ...prev }))} // triggers redraw
                        />
                        <canvas ref={canvasRef} style={{ maxWidth: "80%", maxHeight: "80%", border: "1px solid #ccc" }}></canvas>
                    </>
                ) : (
                    <Box sx={{ textAlign: "center", width: "50%", height: "100%", padding:5, gap:2  }}>
                        <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "1rem" }} />
                        <Typography variant="h6" color="text.secondary" sx={{ marginBottom: "1rem" }}>Please upload an image to start editing</Typography>
                        <IconPhoto size={100} color={theme.palette.primary.main} />
                    </Box>
                )}
            </Box>
            {imageSrc && (
                <Grid container spacing={2} justifyContent="center">
                    {Object.entries(filters).map(([key, value]) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
                            <Typography gutterBottom>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                            <Slider
                                size="small"
                                value={value}
                                onChange={handleSliderChange(key as keyof typeof filters)}
                                min={key === "hueRotate" ? 0 : 0}
                                max={key === "brightness" || key === "contrast" ? 200 : key === "hueRotate" ? 360 : 100}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};
export default SimpleImageEditor;