"use client";
import { Box, Container } from "@mui/material";
import React from "react";
import Style from './wrapper-styles/Styles'
import { PaceReact } from "@/utils/paceReact";
import Header from "@/app/_componets/layout/header/Header"
import NavSidebar from "@/app/_componets/layout/sidebar/Sidebar"

const Layout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <>
      <NavSidebar />
      <Box className="page-wrapper" >
        <Header />
        <Container sx={{ maxWidth: "100%!important", flexGrow: 1 }}>
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </Box>
    </>
  )
};

const LayoutWrapper = ({ children }: { children: React.ReactNode; }) => {
  const { MainWrapper } = Style();
  return (
    <MainWrapper>
      <Layout>
        <PaceReact>
          {children}
        </PaceReact>
      </Layout>
    </MainWrapper>
  );
};

export default LayoutWrapper;