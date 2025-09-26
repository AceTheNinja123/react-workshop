import React from 'react';
import { Box, useTheme, Button } from '@mui/material';

const Menu = ({ onRouteChange }: { onRouteChange: () => void }) => {
    const theme = useTheme();
    const backgroundColor = theme.palette.greenCustomColors[0]
    return (
        <Box sx={{ position: 'relative', width: '100%', height: '90%', border: '2px solid ' + backgroundColor, margin: '10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <Button onClick={onRouteChange} sx={{ width: '150px', height: '75px', background: backgroundColor + "!important", color: '#000 !important', borderRadius: '7px', border: '0px', padding: '10px', fontSize: '1.7em', fontWeight: 'bold' }}>
                Start Game
            </Button>
        </Box>
    );
};

export default Menu;