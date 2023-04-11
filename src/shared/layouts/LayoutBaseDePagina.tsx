import { useTheme, useMediaQuery, Typography, IconButton, Icon } from '@mui/material';
import { Box } from "@mui/system";
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
    titulo: string;
    barraDeFerramentas?: React.ReactNode;
    children: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({titulo, children, barraDeFerramentas}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    
    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="center" padding={1} gap={1}
                height={theme.spacing(smDown ? 6 : 8)} >
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>
                            menu
                        </Icon>  
                    </IconButton>
                )}
                
                <Typography 
                    variant={smDown ? "h5" : "h4"}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                >
                    {titulo}
                </Typography>
            </Box>

            {barraDeFerramentas && (
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}

            <Box flex={1} overflow="auto">
                {children}
            </Box>

        </Box>
    )
}