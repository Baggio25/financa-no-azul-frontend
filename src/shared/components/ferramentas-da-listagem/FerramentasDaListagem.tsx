import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material"

import { Environment } from "../../environment";

interface IFerramentasDaListagem {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    labelInput?: string;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoExportarPDF?: boolean;
    aoClicarEmNovo?: () => void;
    aoClicarEmExportarPDF?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagem> = ({
    textoDaBusca = "",
    mostrarInputBusca = false,
    labelInput = Environment.INPUT_DE_BUSCA,
    aoMudarTextoDeBusca,
    textoBotaoNovo = "Novo",
    mostrarBotaoNovo = true,
    mostrarBotaoExportarPDF = true,
    aoClicarEmNovo,
    aoClicarEmExportarPDF
}) => {
    const theme = useTheme();
    
    return (
        <Box 
            height={theme.spacing(4)} marginX={1} 
            padding={2} paddingX={2} display="flex" 
            gap={1} alignItems="center" component={Paper}
        >
            
            { mostrarInputBusca && (
                <TextField 
                    size="small" 
                    variant="outlined"
                    label={labelInput}
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                    sx={{ flex: 1 }}
                />
            )}
            
            <Box flex={1} gap={1} display="flex" justifyContent="end">
                {mostrarBotaoExportarPDF && (
                    <Button 
                        variant="outlined"
                        color="primary"
                        endIcon={<Icon>picture_as_pdf</Icon>}
                        onClick={aoClicarEmExportarPDF}
                        size="small"
                    >
                        Exportar
                    </Button>
                )}
                {mostrarBotaoNovo && (
                    <Button 
                        variant="contained"
                        color="primary"
                        endIcon={<Icon>add</Icon>}
                        onClick={aoClicarEmNovo}
                        size="small"
                    >
                        {textoBotaoNovo}
                    </Button>
                )}
            </Box>

        </Box>
    )
}