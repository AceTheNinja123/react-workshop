import React, { JSX } from "react";
import Link from "next/link";

// mui imports
import {
  Chip,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  useMediaQuery,
  type Theme,
  styled,
  useTheme
} from '@mui/material';
import { useTranslation } from "react-i18next";
import useStore from "@/state/store";

type NavGroup = {
  [x: string]: unknown;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  subtitle?: string;
  icon?: JSX.ElementType;
  href?: string | object;
  children?: NavGroup[];
  chip?: string;
  chipColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant?: 'filled' | 'outlined';
  external?: boolean;
  level?: number;
  disabled?: boolean;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: boolean | string;
  pathWithoutLastPart?: string,
  level?: number;
  pathDirect: string;
}

export default function NavItem({ item, level, pathDirect, hideMenu, onClick, pathWithoutLastPart }: ItemType) {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const customizer = useStore((state) => state.customizer);
  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();

  const itemIcon =
    Icon && level && level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : Icon ? (
      <Icon stroke={1.5} size="1.3rem" />
    ) : (<></>);

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: "normal",
    wordBreak: "break-word",
    marginBottom: "2px",
    padding: "8px 10px",
    borderRadius: `${customizer.borderRadius}px`,
    backgroundColor: level && level > 1 ? "transparent !important" : "inherit",
    color: theme.palette.text.secondary,
    paddingLeft: `${hideMenu ? 10 : level && level > 2 ? level && level * 10 : level && level > 1 && 20}px`,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    "&.Mui-selected": {
      color: level && level > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.main}!important`
        : level && level > 1 ? theme.palette.text.secondary : "white",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: level && level > 1 ? theme.palette.primary.main : "white",
      },
    },
  }));

  const isSelected = (curr: string, arr: NavGroup) => {
    const idx: number = curr.indexOf('/', 1);
    const idy: number = arr?.href && typeof arr?.href == 'string' ? arr?.href?.indexOf('/', 1) : -1;
    if (idx !== -1 && idy !== -1) {
      const currPathSegment = curr.slice(0, idx);
      const arrPathSegment = typeof arr?.href == 'string' ? arr?.href?.slice(0, idy) : '';

      if (typeof arr?.href == 'string' && !arr?.href?.startsWith('http')) return currPathSegment === arrPathSegment;
    } else {
      return curr === arr?.href;
    }
  };
  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <Link href={item.href ?? '#'}>
        <ListItemStyled
          disabled={item?.disabled}
          selected={isSelected(pathDirect, item)}
          onClick={lgDown ? onClick : undefined}
        >
          <ListItemIcon
            sx={{
              minWidth: "28px",
              p: "3px 0",
              color:
                level && level > 1 && pathDirect === item?.href
                  ? `${theme.palette.primary.main}!important`
                  : "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            {hideMenu ? "" : <>{t(`${item?.title}`)}</>}
            <br />
            {item?.subtitle ? (
              <Typography variant="caption">
                {hideMenu ? "" : t(item?.subtitle)}
              </Typography>
            ) : (
              ""
            )}
          </ListItemText>

          {!item?.chip || hideMenu ? null : (
            <Chip
              color={item?.chipColor}
              variant={item?.variant ? item?.variant : "filled"}
              size="small"
              label={item?.chip}
            />
          )}
        </ListItemStyled>
      </Link>
    </List>
  );
}
