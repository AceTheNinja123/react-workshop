import { type StoreSet } from '../store';

export interface State {
    activeDir?: string;
    activeMode?: string;
    activeTheme?: string;
    SidebarWidth?: number;
    MiniSidebarWidth?: number;
    TopbarHeight?: number;
    isCollapse?: boolean;
    isLayout?: string;
    isSidebarHover?: boolean;
    isMobileSidebar?: boolean;
    isHorizontal?: boolean;
    isLanguage?: string;
    isCardShadow?: boolean;
    borderRadius?: number;
    pageTitle?: string;
}

export interface Actions {
    setTheme: (theme: string) => void;
    setMode: (mode: string) => void;
    setDir: (dir: string) => void;
    setLanguage: (lng: string) => void;
    setCardShadow: (shadow: boolean) => void;
    toggleSidebar: () => void;
    hoverSidebar: (hover: boolean) => void;
    toggleMobileSidebar: (mobile: boolean) => void;
    toggleLayout: (layout: string) => void;
    toggleHorizontal: (horizontal: boolean) => void;
    setBorderRadius: (radius: number) => void;
    setPageTitle: (title: string) => void;
}

const initialState: State = {
    activeDir: 'ltr',
    activeMode: 'light',
    activeTheme: 'BLUE_THEME',
    SidebarWidth: 250,
    MiniSidebarWidth: 75,
    TopbarHeight: 70,
    isLayout: 'full',
    isCollapse: false,
    isSidebarHover: false,
    isMobileSidebar: false,
    isHorizontal: false,
    isLanguage: 'en',
    isCardShadow: true,
    borderRadius: 7,
    pageTitle: 'Dashboard'
}

const initialActions = (set: StoreSet): Actions => ({
    setTheme: (theme) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            activeTheme: theme
        },
    })),
    setPageTitle: (title) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            pageTitle: title
        },
    })),
    setMode: (mode) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            activeMode: mode,
        },
    })),
    setDir: (dir) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            activeDir: dir,
        },
    })),
    setLanguage: (lng) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            isLanguage: lng,
        },
    })),
    setCardShadow: (shadow) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            isCardShadow: shadow,
        },
    })),
    toggleSidebar: () => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            isCollapse: !state.customizer.isCollapse,
        },
    })),
    hoverSidebar: (hover) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            isSidebarHover: hover,
        },
    })),
    toggleMobileSidebar: (mobile) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            isMobileSidebar: mobile,
        },
    })),
    toggleLayout: (layout) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            isLayout: layout,
        },
    })),
    toggleHorizontal: (horizontal) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            isHorizontal: horizontal,
        },
    })),
    setBorderRadius: (radius) => set((state) => ({
        ...state,
        customizer: {
            ...state.customizer,
            borderRadius: radius,
        },
    })),
});

export const CustomizerSlice = (set: StoreSet): State & Actions => ({
    ...initialState,
    ...initialActions(set),
})