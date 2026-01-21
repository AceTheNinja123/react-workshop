"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
//View Pages
import PostWordCount from "./views/PostWordCount";
import Calculator from "./views/Calculator";
import AgeCalculator from "./views/AgeCalculator";
import SimpleImageEditor from "./views/SimpleImageEditor";
import ExpenseTracker from "./views/ExpenseTracker";
import EmplayeeDatabaseManagement from "./views/EmplayeeDatabaseManagement";
//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Post Word Count" subHeader="Counts the characters being put in" >
            <PostWordCount />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Calculator" subHeader="Calculat the numbers you need" >
            <Calculator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Age Calculator" subHeader="Enter dates calculate the age" >
            <AgeCalculator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Simple Image Editor" subHeader="Upload an image, edit the Image then either save or reset the image" >
            <SimpleImageEditor />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Expense Tracker" subHeader="Track your expenses" >
            <ExpenseTracker />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Employee Database Management" subHeader="Manage employee records" >
            <EmplayeeDatabaseManagement />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Dashboard; 