
import { Box, Paper, useTheme, Button, Icon, Divider, Skeleton, Typography, useMediaQuery } from "@mui/material";

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;
    
    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEVoltarCarregando?: boolean;
    
    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = "Novo",
    
    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEVoltar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEVoltarCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEVoltar
}) => {
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    

    return(
        <Box 
            height={theme.spacing(5)} marginX={1} variant="outlined"
            padding={1} paddingX={2} display="flex" 
            gap={1} alignItems="center" component={Paper}
        >

            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarEmSalvar}
                    size="small"
                >
                    <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                        Salvar
                    </Typography>
                </Button>
            )}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando && !mdDown) && (
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Icon>check</Icon>}
                    onClick={aoClicarEmSalvarEVoltar}
                    size="small"
                >
                    <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                        Salvar e Voltar
                    </Typography>
                </Button>
            )}
            
            {(mostrarBotaoSalvarEVoltarCarregando && !mdDown) && (
                <Skeleton width={180} height={60} />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Icon>delete</Icon>}
                    onClick={aoClicarEmApagar}
                    size="small"
                >
                    <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                        Apagar
                    </Typography>
                </Button>
            )}
            
            {mostrarBotaoApagarCarregando && (
                <Skeleton width={110} height={60} />
            )}
            
            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !mdDown) && (
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Icon>add</Icon>}
                    onClick={aoClicarEmNovo}
                    size="small"
                >
                    <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                        {textoBotaoNovo}
                    </Typography>
                </Button>
            )}
            
            {(mostrarBotaoNovoCarregando && !mdDown) && (
                <Skeleton width={110} height={60} />
            )}

            {   (
                    mostrarBotaoVoltar && 
                    (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEVoltar)
                ) && (
                    <Divider variant="middle" orientation="vertical"/>
            )}
            
            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicarEmVoltar}
                    size="small"
                >
                    {!smDown && (
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Voltar
                        </Typography>
                    )}
                </Button>
            )}

            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={110} height={60} />
            )}
        </Box>
    )
}