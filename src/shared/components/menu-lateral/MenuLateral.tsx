import { ListItemButton, ListItemIcon, ListItemText, Icon, Divider, List, Drawer, useTheme, Avatar, useMediaQuery} from "@mui/material";
import { Box } from "@mui/system";

import { ListaItemMenu } from "../lista-itens-menu/ListaItemMenu";
import { useAppThemeContext, useDrawerContext } from "../../contexts";


interface IAppThemeProviderProps {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<IAppThemeProviderProps> = ({children}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
    const { toggleTheme } = useAppThemeContext();

    return (
        <>
            <Drawer open={isDrawerOpen} 
                variant={smDown ? "temporary" : "permanent"} 
                onClose={toggleDrawerOpen}>
                <Box  
                    width={theme.spacing(28)}
                    height="100%" 
                    display="flex" 
                    flexDirection="column">
                        
                    <Box 
                        width="100%" 
                        height={theme.spacing(15)} 
                        display="flex" alignItems="center" 
                        justifyContent="center">
                        
                        <Avatar 
                            sx={{ height: theme.spacing(10),  width: theme.spacing(10) }} 
                            src="https://mui.com/static/images/avatar/1.jpg"
                        />

                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOption => (
                                <ListaItemMenu 
                                    key={drawerOption.path}
                                    icon={drawerOption.icon} 
                                    label={drawerOption.label} 
                                    to={drawerOption.path} 
                                    onClick={smDown ? toggleDrawerOpen : undefined} />
                            ))}
                        </List>
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component="nav">
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Alterar Tema" />
                            </ListItemButton>         

                            <ListaItemMenu icon="logout" label="Sair" to="/sair" onClick={() => ""} />
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    )
}