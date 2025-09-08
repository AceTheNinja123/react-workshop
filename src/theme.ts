'use client';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { type Shadows, createTheme, type ThemeOptions, type Theme } from '@mui/material/styles';
import _ from 'lodash';
import useStore, { type Store } from "@/state/store";

// Extend MUI palette typings
declare module "@mui/material/styles" {
  interface Palette {
    customColors: string[];
  }
  interface PaletteOptions {
    customColors?: string[];
  }
}

type DarkThemeColorsType = {
  name: string;
  palette: {
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    background: {
      default: string;
      light: string;
      dark: string;
      paper: string;
    };
  };
}

type LightThemeColorsType = {
  name: string;
  palette: {
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    background: {
      default: string;
      light: string;
      dark: string;
      paper: string;
    };
  };
}

/*
    ------------------------------
              shadows
    ------------------------------
*/

const shadows: Shadows = [
  'none',
  '0px 2px 3px rgba(0,0,0,0.10)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 8px -2px rgba(0,0,0,0.25)',
  '0 9px 17.5px rgb(0,0,0,0.05)',
  'rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 12px -4px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 16px -4px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 16px -4px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 8px 18px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 9px 18px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 10px 20px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 11px 20px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 12px 22px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 13px 22px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 14px 24px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 16px 28px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 18px 30px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 20px 32px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 22px 34px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)',
];

const darkshadows: Shadows = [
  'none',
  '0px 2px 3px rgba(0,0,0,0.10)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 8px -2px rgba(0,0,0,0.25)',
  '0 9px 17.5px rgb(0,0,0,0.05)',
  'rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 2%) 0px 12px 24px -4px',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 12px -4px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 16px -4px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 16px -4px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 8px 18px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 9px 18px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 10px 20px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 11px 20px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 12px 22px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 13px 22px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 14px 24px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 16px 28px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 18px 30px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 20px 32px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 22px 34px -8px rgba(0,0,0,0.25)',
  '0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)',
];

/*
    -------------------------------------
              Default Colors
    -------------------------------------
*/

const baselightTheme = {
  direction: 'ltr',
  palette: {
    primary: { main: '#5D87FF', light: '#ECF2FF', dark: '#4570EA', },
    secondary: { main: '#49BEFF', light: '#E8F7FF', dark: '#23afdb', },
    success: { main: '#27AE60', light: '#E8F9F1', dark: '#1E8449', contrastText: '#ffffff', },
    info: { main: '#2980B9', light: '#EAF3FB', dark: '#21618C', contrastText: '#ffffff', },
    error: { main: '#C0392B', light: '#FDECEA', dark: '#922B21', contrastText: '#ffffff', },
    warning: { main: '#E67E22', light: '#FEF3E6', dark: '#A04000', contrastText: '#ffffff', },
    purple: { A50: '#EBF3FE', A100: '#6610f2', A200: '#557fb9', },
    grey: { 100: '#F2F6FA', 200: '#EAEFF4', 300: '#DFE5EF', 400: '#7C8FAC', 500: '#5A6A85', 600: '#2A3547', },
    blue: { 100: '#03658C', 200: '#03658C', 300: '#03658C', 400: '#037EAE', 500: '#0496D0', 600: '#049DD9', },
    customColors: ["#FF5733", "#FF8C00", "#FFD700", "#00FF00", "#00FFFF", "#FF00FF", "#FF1493", "#FFFF00", "#FF4500", "#FF69B4", "#ADFF2F", "#FF1493", "#E53935", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FF9800"],
    text: { primary: '#2A3547', secondary: '#2A3547', },
    action: { disabledBackground: 'rgba(73,82,88,0.12)', hoverOpacity: 0.02, hover: '#f6f9fc', },
    divider: '#e5eaef',
  },
};

const baseDarkTheme = {
  direction: 'ltr',
  palette: {
    primary: { main: '#5D87FF', light: '#ECF2FF', dark: '#4570EA', },
    secondary: { main: '#777e89', light: '#1C455D', dark: '#173f98', },
    success: { main: '#1ABC9C', light: '#145A52', dark: '#16A085', contrastText: '#ffffff', },
    info: { main: '#3498DB', light: '#1C3F63', dark: '#2980B9', contrastText: '#ffffff', },
    error: { main: '#E74C3C', light: '#5C2B2A', dark: '#C0392B', contrastText: '#ffffff', },
    warning: { main: '#F39C12', light: '#5A3C19', dark: '#D68910', contrastText: '#ffffff', },
    purple: { A50: '#EBF3FE', A100: '#6610f2', A200: '#557fb9', },
    grey: { 100: '#333F55', 200: '#465670', 300: '#7C8FAC', 400: '#DFE5EF', 500: '#EAEFF4', 600: '#F2F6FA' },
    customColors: ["#1ABC9C", "#16A085", "#2ECC71", "#3498DB", "#2980B9", "#34495E", "#F1C40F", "#E67E22", "#D35400", "#C0392B", "#9B59B6", "#8E44AD", "#BDC3C7", "#95A5A6", "#7F8C8D", "#5D6D7E", "#1F618D", "#7D3C98", "#AF7AC5", "#48C9B0", "#45B39D", "#58D68D", "#F1948A", "#BB8FCE"],
    text: { primary: '#EAEFF4', secondary: '#7C8FAC', },
    action: { disabledBackground: 'rgba(73,82,88,0.12)', hoverOpacity: 0.02, hover: '#333F55', },
    divider: '#333F55',
    background: { default: '#171c23', dark: '#171c23', paper: '#171c23', },
  },
};

/*
    ----------------------------------------
                Theme Colors
    ----------------------------------------
*/

const LightThemeColors = [
  {
    name: 'BLUE_THEME',
    palette: {
      primary: { main: '#5D87FF', light: '#ECF2FF', dark: '#4570EA', contrastText: '#ffffff', },
      secondary: { main: '#49BEFF', light: '#E8F7FF', dark: '#23afdb', contrastText: '#ffffff', },
      background: { default: '#fff', light: '#fff', dark: '#f7f7f7', paper: '#fff', },
    },
  },
  {
    name: 'GREEN_THEME',
    palette: {
      primary: { main: '#4CAF50', light: '#E8F5E9', dark: '#3B8E40', contrastText: '#ffffff', },
      secondary: { main: '#81C784', light: '#F1F8F3', dark: '#66BB6A', contrastText: '#ffffff', },
      background: { default: '#fff', light: '#fff', dark: '#f7f7f7', paper: '#fff', },
    },
  },
  {
    name: 'PURPLE_THEME',
    palette: {
      primary: { main: '#9C27B0', light: '#F3E5F5', dark: '#7B1FA2', contrastText: '#ffffff', },
      secondary: { main: '#CE93D8', light: '#FAF0FA', dark: '#AB47BC', contrastText: '#ffffff', },
      background: { default: '#fff', light: '#fff', dark: '#f7f7f7', paper: '#fff', },
    },
  },
  {
    name: 'ORANGE_THEME',
    palette: {
      primary: { main: '#FF9800', light: '#FFF3E0', dark: '#F57C00', contrastText: '#ffffff', },
      secondary: { main: '#FFB74D', light: '#FFF7EB', dark: '#FB8C00', contrastText: '#ffffff', },
      background: { default: '#fff', light: '#fff', dark: '#f7f7f7', paper: '#fff', },
    },
  },
  {
    name: 'RED_THEME',
    palette: {
      primary: { main: '#F44336', light: '#FFEBEE', dark: '#D32F2F', contrastText: '#ffffff', },
      secondary: { main: '#E57373', light: '#FFF1F1', dark: '#C62828', contrastText: '#ffffff', },
      background: { default: '#fff', light: '#fff', dark: '#f7f7f7', paper: '#fff', },
    },
  },
  {
    name: 'PINK_THEME',
    palette: {
      primary: { main: '#EC4899', light: '#FCE7F3', dark: '#DB2777', contrastText: '#ffffff', },
      secondary: { main: '#F472B6', light: '#FDF2F8', dark: '#E11D48', contrastText: '#ffffff', },
      background: { default: '#fff', light: '#fff', dark: '#f7f7f7', paper: '#fff', },
    },
  },
];

const DarkThemeColors = [
  {
    name: 'BLUE_THEME',
    palette: {
      primary: { main: '#5D87FF', light: '#253662', dark: '#4570EA', contrastText: '#ffffff', },
      secondary: { main: '#49BEFF', light: '#1C455D', dark: '#23afdb', contrastText: '#ffffff', },
      background: { default: '#2A3447', light: '#2A3447', dark: '#2f394c', paper: '#2A3447', },
    },
  },
  {
    name: 'GREEN_THEME',
    palette: {
      primary: { main: '#4CAF50', light: '#2F4D34', dark: '#3B8E40', contrastText: '#ffffff', },
      secondary: { main: '#81C784', light: '#1F3923', dark: '#66BB6A', contrastText: '#ffffff', },
      background: { default: '#1F2D24', light: '#1F2D24', dark: '#26392D', paper: '#1F2D24', },
    },
  },
  {
    name: 'PURPLE_THEME',
    palette: {
      primary: { main: '#9C27B0', light: '#3A2540', dark: '#7B1FA2', contrastText: '#ffffff', },
      secondary: { main: '#CE93D8', light: '#2E1E33', dark: '#AB47BC', contrastText: '#ffffff', },
      background: { default: '#2A2433', light: '#2A2433', dark: '#322B3E', paper: '#2A2433', },
    },
  },
  {
    name: 'ORANGE_THEME',
    palette: {
      primary: { main: '#FF9800', light: '#4A3220', dark: '#F57C00', contrastText: '#ffffff', },
      secondary: { main: '#FFB74D', light: '#3D2A15', dark: '#FB8C00', contrastText: '#ffffff', },
      background: { default: '#332A22', light: '#332A22', dark: '#3E332B', paper: '#332A22', },
    },
  },
  {
    name: 'RED_THEME',
    palette: {
      primary: { main: '#F44336', light: '#4D2320', dark: '#D32F2F', contrastText: '#ffffff', },
      secondary: { main: '#E57373', light: '#3D1E1D', dark: '#C62828', contrastText: '#ffffff', },
      background: { default: '#2E2222', light: '#2E2222', dark: '#3A2B2B', paper: '#2E2222', },
    },
  },
  {
    name: 'PINK_THEME',
    palette: {
      primary: { main: '#EC4899', light: '#3C1A2B', dark: '#DB2777', contrastText: '#ffffff', },
      secondary: { main: '#F472B6', light: '#3F2D3A', dark: '#BE185D', contrastText: '#ffffff', },
      background: { default: '#2A3447', light: '#2A3447', dark: '#2f394c', paper: '#2A3447', },
    },
  },
];

/*
    ------------------------------
              components
    ------------------------------
*/

const components = (theme: Theme) => ({
  MuiCssBaseline: {
    styleOverrides: {
      '*': { boxSizing: 'border-box', },
      html: {
        height: '100%',
        width: '100%',
      },
      a: { textDecoration: 'none', },
      body: {
        height: '100%',
        margin: 0,
        padding: 0,
      },
      '#root': { height: '100%', },
      "*[dir='rtl'] .buyNowImg": { transform: 'scaleX(-1)', },
      '.border-none': {
        border: '0px',
        td: { border: '0px', },
      },
      '.btn-xs': {
        minWidth: '30px !important',
        width: '30px',
        height: '30px',
        borderRadius: '6px !important',
        padding: '0px !important',
      },
      '.hover-text-primary:hover .text-hover': {
        color: theme.palette.primary.main,
      },
      '.hoverCard:hover': {
        scale: '1.01',
        transition: ' 0.1s ease-in',
      },
      '.signup-bg': {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
      },
      '.MuiBox-root': {
        borderRadius: theme.shape.borderRadius,
      },
      '.page-wrapper': {
        display: "flex",
        flexGrow: 1,
        paddingBottom: "60px",
        flexDirection: "column",
        zIndex: 1,
        width: "100%",
        transition: theme.transitions.create(["margin", "width"], {
          duration: theme.transitions.duration.shortest,
        }),
        
        backgroundColor: theme.palette.primary.light,
      },
      '.MuiCardHeader-action': { alignSelf: 'center !important', },
      '.emoji-picker-react .emoji-scroll-wrapper': { overflowX: 'hidden', },
      '.scrollbar-container': { borderRight: '0 !important', },
      '.theme-timeline .MuiTimelineOppositeContent-root': { minWidth: '90px', },
      '.MuiAlert-root .MuiAlert-icon': { color: 'inherit!important', },
      '.MuiTimelineConnector-root': { width: '1px !important', },
      ' .simplebar-scrollbar:before': { background: `${theme.palette.grey[300]} !important`, },
      '@keyframes gradient': {
        '0%': { backgroundPosition: '0% 50%', },
        '50%': { backgroundPosition: ' 100% 50%', },
        '100% ': { backgroundPosition: ' 0% 50%', },
      },
      '.rounded-bars .apexcharts-bar-series.apexcharts-plot-series .apexcharts-series path': {
        clipPath: 'inset(0 0 5% 0 round 20px)',
      },
      svg: {
        display: 'inline-block !important',
      },
      '.pace': {
        pointerEvents: 'none',
        userSelect: 'none',
        perspective: '12rem',
        zIndex: 9001,
        position: 'fixed',
        height: '4rem',
        width: '4rem',
        margin: 'auto',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      '.pace.pace-inactive .pace-progress': { display: 'none', },
      '.pace .pace-progress': {
        zIndex: 2000,
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '4rem',
        width: '4rem !important',
        lineHeight: '4rem',
        fontSize: '1.3rem',
        borderRadius: '50%',
        background: `${theme.palette.primary.main}CC`,
        color: '#fff',
        fontFamily: '"Helvetica Neue", sans-serif',
        fontWeight: 100,
        textAlign: 'center',
        animation: 'pace-theme-center-circle-spin linear infinite 2s',
        transformStyle: 'preserve-3d',
      },
      '.pace .pace-progress:after': {
        content: 'attr(data-progress-text)',
        display: 'block',
      },
      '@keyframes pace-theme-center-circle-spin': {
        from: { transform: 'rotateY(0deg)', },
        to: { transform: 'rotateY(360deg)', },
      },
      '.tripadvisorgreen': { color: '#00a680!important', },
      '.ta_url': { width: '100%', }
    },
  },
  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        ':before': {
          backgroundColor: theme.palette.grey[100],
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: {
        borderColor: theme.palette.divider,
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: { boxShadow: 'none', },
      sizeSmall: {
        width: 30,
        height: 30,
        minHeight: 30,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        boxShadow: 'none'
      },
      text: { padding: '5px 15px', },
      textPrimary: {
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.main,
        },
      },
      textSecondary: {
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.secondary.main,
        },
      },
      textSuccess: {
        backgroundColor: theme.palette.success.light,
        '&:hover': {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.main,
        },
      },
      textError: {
        backgroundColor: theme.palette.error.light,
        '&:hover': {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.main,
        },
      },
      textInfo: {
        backgroundColor: theme.palette.info.light,
        '&:hover': {
          backgroundColor: theme.palette.info.light,
          color: theme.palette.info.main,
        },
      },
      textWarning: {
        backgroundColor: theme.palette.warning.light,
        '&:hover': {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.main,
        },
      },
      outlinedPrimary: {
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        },
      },
      outlinedSecondary: {
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: 'white',
        },
      },
      outlinedError: {
        '&:hover': {
          backgroundColor: theme.palette.error.main,
          color: 'white',
        },
      },
      outlinedSuccess: {
        '&:hover': {
          backgroundColor: theme.palette.success.main,
          color: 'white',
        },
      },
      outlinedInfo: {
        '&:hover': {
          backgroundColor: theme.palette.info.main,
          color: 'white',
        },
      },
      outlinedWarning: {
        '&:hover': {
          backgroundColor: theme.palette.warning.main,
          color: 'white',
        },
      },
      containedPrimary: {
        backgroundColor: theme.palette.primary.main + ' !important',
        '&.Mui-disabled': { backgroundColor: 'rgba(73,82,88,0.12)' + ' !important', }
      },
      containedSecondary: {
        backgroundColor: theme.palette.secondary.main + ' !important',
        '&.Mui-disabled': { backgroundColor: 'rgba(73,82,88,0.12)' + ' !important', }
      },
      containedError: {
        backgroundColor: theme.palette.error.main + ' !important',
        '&.Mui-disabled': { backgroundColor: 'rgba(73,82,88,0.12)' + ' !important', }
      },
      containedSuccess: {
        backgroundColor: theme.palette.success.main + ' !important',
        '&.Mui-disabled': { backgroundColor: 'rgba(73,82,88,0.12)' + ' !important', }
      },
      containedInfo: {
        backgroundColor: theme.palette.info.main + ' !important',
        '&.Mui-disabled': { backgroundColor: 'rgba(73,82,88,0.12)' + ' !important', }
      },
      containedWarning: {
        backgroundColor: theme.palette.warning.main + ' !important',
        '&.Mui-disabled': {
          backgroundColor: 'rgba(73,82,88,0.12)' + ' !important',
        }
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: { padding: '16px 24px', },
      title: { fontSize: '1.125rem', },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        width: '100%',
        padding: '15px',
        backgroundImage: 'none',
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '24px',
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        maxHeight: '29.5em',
      },
    },
  },
  MuiTable: {
    styleOverrides: {
      root: {
        whiteSpace: 'nowrap',
        minWidth: 600,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: '4px 8px',
        borderBottom: `1px solid ${theme.palette.divider}`
      },
      head: {
        '&:last-of-type': { borderRadius: `0px ${theme.shape.borderRadius}px 0px 0px`, },
        '&:first-of-type': { borderRadius: `${theme.shape.borderRadius}px 0px 0px 0px`, },
      },
      body: {
        maxWidth: '900px',
        whiteSpace: 'normal',
        wordBreak: 'break-word' as const
      },
      // MuiTableRow: {
      //   styleOverrides: {
      //     root: {
      //       '&:nth-of-type(odd)': {
      //         backgroundColor: theme.palette.background.dark,
      //       },
      //       '&:nth-of-type(even)': {
      //         backgroundColor: theme.palette.background.light,
      //       },
      //       '&:last-child td': {
      //         borderBottom: 0,
      //       },
      //     },
      //   },
      // },
      MuiTablePagination: {
        styleOverrides: {
          spacer: {
            display: 'none',
          },
          toolbar: {
            minHeight: '40px !important',
            padding: '0 0 0 10px !important',
            borderTop: `1px solid ${theme.palette.divider}`,
          },
          selectLabel: {
            marginLeft: 0,
          },
          select: {
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            '&:hover': { backgroundColor: theme.palette.action.hover, },
            '&:focus': { borderRadius: theme.shape.borderRadius, },
          },
          displayedRows: {
            marginLeft: 'auto',
          },
        },
      },
      // MuiGrid2: {
      //   styleOverrides: {
      //     root: {
      //       paddingTop: '30px',
      //       paddingLeft: '30px !important',
      //     },
      //   },
      // },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.grey[200],
            borderRadius: typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius - 1 : theme.shape.borderRadius,
          },
        },
      },
      MuiTimelineConnector: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.divider,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: theme.palette.divider,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: '0.75rem',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          filledSuccess: { color: 'white', },
          filledInfo: { color: 'white', },
          filledError: { color: 'white', },
          filledWarning: { color: 'white', },
          standardSuccess: {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.main,
          },
          standardError: {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.main,
          },
          standardWarning: {
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.main,
          },
          standardInfo: {
            backgroundColor: theme.palette.info.light,
            color: theme.palette.info.main,
          },
          outlinedSuccess: {
            borderColor: theme.palette.success.main,
            color: theme.palette.success.main,
          },
          outlinedWarning: {
            borderColor: theme.palette.warning.main,
            color: theme.palette.warning.main,
          },
          outlinedError: {
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
          },
          outlinedInfo: {
            borderColor: theme.palette.info.main,
            color: theme.palette.info.main,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[300], },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.grey[300], },
          },
          input: { padding: '12px 14px', },
          inputSizeSmall: { padding: '8px 14px', },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: theme.palette.background.paper,
            background: theme.palette.text.primary,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderColor: `${theme.palette.divider}`,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: '1.25rem',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#2c3649',
            marginTop: 10,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow: 'rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            background: theme.palette.background.paper,
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            [theme.breakpoints.up('lg')]: {
              minHeight: 70,
            },
          }
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            width: '100%',
            color: theme.palette.text.secondary,
          }
        },
      },
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            marginTop: 5,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
          }
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            '&.Mui-selected': { backgroundColor: theme.palette.info.main },
            '&:hover': { backgroundColor: theme.palette.primary.light },
            '&.Mui-selected:hover': { backgroundColor: theme.palette.primary.main },
            borderRadius: theme.shape.borderRadius,
          },
          today: {
            border: `1px solid ${theme.palette.divider}!important`,
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            border: `1px solid ${theme.palette.divider}`,
            borderRight: 0,
            borderTop: 0,
            borderLeft: 0,
          }
        },
      },
      MuiDayCalendar: {
        styleOverrides: {
          root: {
            border: `1px solid ${theme.palette.divider}`,
            borderRight: 0,
            borderTop: 0,
            borderLeft: 0,
          }
        },
      },
      MuiMenu: {
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: 'rowedMenu' },
                style: {
                  '& .MuiMenu-list': {
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: 1,
                    paddingBottom: 1,
                    border: `1px solid ${theme.palette.divider}`,
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
});

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const typography = {
  fontFamily: plus.style.fontFamily,
  h1: { fontWeight: 600, fontSize: '2.25rem', lineHeight: '2.75rem', },
  h2: { fontWeight: 600, fontSize: '1.875rem', lineHeight: '2.25rem', },
  h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: '1.75rem', },
  h4: { fontWeight: 600, fontSize: '1.3125rem', lineHeight: '1.6rem', },
  h5: { fontWeight: 600, fontSize: '1.125rem', lineHeight: '1.6rem', },
  h6: { fontWeight: 600, fontSize: '1rem', lineHeight: '1.2rem', },
  button: { textTransform: 'capitalize', fontWeight: 400, },
  body1: { fontSize: '12px', fontWeight: 400, lineHeight: '1.334rem', },
  body2: { fontSize: '0.75rem', letterSpacing: '0rem', fontWeight: 400, lineHeight: '1rem', },
  subtitle1: { fontSize: '0.875rem', fontWeight: 400, },
  subtitle2: { fontSize: '0.875rem', fontWeight: 400, },
};

let themeSelect, defaultTheme, defaultShadow;

export const ThemeSettings = () => {
  const customizer = useStore((state: Store) => state.customizer);

  if (customizer.activeMode == 'dark') {
    themeSelect = DarkThemeColors.find((entry: DarkThemeColorsType) => entry.name == customizer.activeTheme);
    defaultTheme = baseDarkTheme;
    defaultShadow = darkshadows;
  } else {
    themeSelect = LightThemeColors.find((entry: LightThemeColorsType) => entry.name == customizer.activeTheme);
    defaultTheme = baselightTheme;
    defaultShadow = shadows;
  }

  const baseObj = {
    palette: { mode: customizer.activeMode, },
    shadows: defaultShadow,
    typography: typography,
  };

  const themeOptions: ThemeOptions = _.merge({}, baseObj, defaultTheme as ThemeOptions, themeSelect as ThemeOptions);

  const theme = createTheme(themeOptions);
  theme.components = components(theme);
  return theme;
};