"use client";
import { MenuItems } from './MenuItems';
import { usePathname } from "next/navigation";
import { Box, List, useMediaQuery, type Theme } from '@mui/material';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import useStore, { type Store } from "@/state/store";

const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useStore((state: Store) => state.customizer);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const hideMenu: boolean | string = lgUp && customizer.isCollapse && customizer.isSidebarHover ? customizer.isCollapse && !customizer.isSidebarHover : '';

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {MenuItems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => customizer.toggleMobileSidebar(!customizer.isMobileSidebar)}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem item={item} pathWithoutLastPart={pathWithoutLastPart} key={item.id} pathDirect={pathDirect} hideMenu={hideMenu} onClick={() => customizer.toggleMobileSidebar(!customizer.isMobileSidebar)} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
