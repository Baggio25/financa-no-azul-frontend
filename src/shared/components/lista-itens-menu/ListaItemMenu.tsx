import { ListItemButton, ListItemIcon, ListItemText, Icon } from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IListaItensMenuProps {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
}

export const ListaItemMenu: React.FC<IListaItensMenuProps> = ({label, icon, to, onClick}) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();
    } 

    return(
        <>
            <ListItemButton onClick={handleClick} selected={!!match}>
                <ListItemIcon>
                    <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItemButton>         

        </>
    )
}