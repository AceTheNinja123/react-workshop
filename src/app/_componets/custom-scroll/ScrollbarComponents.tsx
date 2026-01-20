//ScrollbarComponents
import "simplebar-react/dist/simplebar.min.css";
import Box from '@mui/material/Box'
import { SxProps } from '@mui/system';
import { styled } from '@mui/material/styles'

const SimpleBarStyle = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: "auto",
    p: 5,
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.palette.primary.main} transparent !important`,
    "&::-webkit-scrollbar": { width: "8px", },
    "&::-webkit-scrollbar-thumb": { backgroundColor: `${theme.palette.primary.dark} !important`, borderRadius: 4, },
    "&::-webkit-scrollbar-track": { backgroundColor: "transparent", },
    "& .simplebar-scrollbar:before": {
        backgroundColor: `${theme.palette.primary.main} !important`,
    },
}));

interface PropsType {
    children: React.ReactElement | React.ReactNode;
    sx: SxProps;
}

const ScrollbarComponents = (props: PropsType) => {
    const { children, sx, ...other } = props;

    return (
        <SimpleBarStyle sx={sx} {...other}>
            {children}
        </SimpleBarStyle>
    );
};

export default ScrollbarComponents;
