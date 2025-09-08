import React, { JSX } from "react";
import { Card } from '@mui/material';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';

type Props = {
    className?: string;
    children: JSX.Element | JSX.Element[];
    sx?: SxProps<Theme>;
    elevation?: number;
    variant?: 'outlined' | 'elevation' | undefined;
    border?: boolean;
};

const BlankCard = ({ children, className, sx, elevation, variant, border }: Props) => {

    const theme = useTheme();
    const borderColor = theme.palette.divider;

    return (
        <Card
            sx={{ p: 0, border: border ? `1px solid ${borderColor}` : 'none', position: 'relative', ...(Array.isArray(sx) ? sx : [sx]) }}
            className={className}
            elevation={elevation}
            variant={variant}
        >
            {children}
        </Card>
    );
};

export default BlankCard;
