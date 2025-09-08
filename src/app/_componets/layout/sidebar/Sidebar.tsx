import { Box, Drawer } from "@mui/material";
import React from "react";

import SidebarItems from "./SidebarItems";
import Scrollbar from "@/app/_componets/custom-scroll/Scrollbar";
import useStore, { type Store } from "@/state/store";

const Sidebar = () => {
  const customizer = useStore((state: Store) => state.customizer);

  const toggleWidth = customizer.isCollapse && !customizer.isSidebarHover ? 0 : customizer.SidebarWidth;

  const onHoverEnter = () => {
    if (customizer.isCollapse) customizer.hoverSidebar(true);
  };

  const onHoverLeave = () => {
    if (customizer.isCollapse) customizer.hoverSidebar(false);
  };

  return (
    <>
      <Box
        sx={{
          zIndex: 100,
          width: toggleWidth,
          flexShrink: 0,
          ...(customizer.isCollapse && {
            position: "absolute",
          }),
        }}
      >
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                p: 1,
                transition: (theme) =>
                  theme.transitions.create("width", {
                    duration: theme.transitions.duration.shortest,
                  }),
                width: toggleWidth,
                bgcolor: (theme) => theme.palette.primary.light,
                boxSizing: "border-box",
                borderRight: (theme) => `solid 2px ${theme.palette.primary.main}`,
              },
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Scrollbar sx={{ height: "calc(100% - 190px)" }}>
              <SidebarItems />
            </Scrollbar>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
