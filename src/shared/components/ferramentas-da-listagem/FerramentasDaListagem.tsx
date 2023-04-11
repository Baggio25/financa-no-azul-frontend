import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material"

interface IFerramentasDaListagem {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    placeholder?: string;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagem> = ({
    textoDaBusca = "",
    mostrarInputBusca = false,
    placeholder = "Pesquisar...",
    aoMudarTextoDeBusca,
    textoBotaoNovo = "Novo",
    mostrarBotaoNovo = true,
    aoClicarEmNovo
}) => {
    const theme = useTheme();
    
    return (
        <Box 
            height={theme.spacing(5)} marginX={1} 
            padding={1} paddingX={2} display="flex" 
            gap={1} alignItems="center" component={Paper}
        >
            
            { mostrarInputBusca && (
                <TextField 
                    size="small" 
                    placeholder={placeholder}
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                />
            )}
            
            <Box flex={1} display="flex" justifyContent="end">
                {mostrarBotaoNovo && (
                    <Button 
                        variant="contained"
                        color="primary"
                        endIcon={<Icon>add</Icon>}
                        onClick={aoClicarEmNovo}
                    >
                        {textoBotaoNovo}
                    </Button>
                )}
            </Box>

        </Box>
    )
}