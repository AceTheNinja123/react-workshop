"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";
import RectangularTreeMapLayout from "./views/RectangularTreeMap";
import PackedCirclesLayout from "./views/PackedCircles";
import ForceDirectedTreeLayout from "./views/ForceDirectedTree";
const HierarchyGraphs = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Rectangular Tree Map" subHeader="View the word distribution as rectangles for a restaurant">
            <RectangularTreeMapLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Packed Circles" subHeader="View the word distribution as stacked circles for a restaurant">
            <PackedCirclesLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Force Directed Tree" subHeader="View the force-directed tree for coffee types and their relationships">
            <ForceDirectedTreeLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box >
  );
}
export default HierarchyGraphs; 