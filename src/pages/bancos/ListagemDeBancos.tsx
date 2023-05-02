/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Table, TableBody, TableCell, TableContainer, TableHead, 
         TableRow, TableFooter, Paper, LinearProgress, 
         Pagination, IconButton } from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";

import { BancosService } from "../../shared/services/api/bancos/BancosService";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { TListagemBanco } from "../../shared/types/Banco";
import { Environment } from "../../shared/environment";

export const ListagemDeBancos: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [rows, setRows] = useState<TListagemBanco[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
 
    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);
    
    const pagina = useMemo(() => {
        return Number(searchParams.get("pagina") || "1");
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {      
                BancosService
                    .findAllByNomeOrNumero(pagina, busca)
                        .then((result) => {
                            setIsLoading(false);
                            
                            if(result instanceof Error) {
                                alert(result.message);
                            }else{
                                setTotalCount(result.totalCount);   
                                setRows(result.data);
                            }                               
                        });
        });

    }, [busca, pagina]);

    const handleDelete = (id: number) => {
        if(confirm("Deseja realmente apagar?")) {
            BancosService.deleteById(id)
                .then(result => {
                    if(result instanceof Error) {
                        alert(result.message)
                    } else {
                        setRows(oldRows => {
                            return[
                                ...oldRows.filter(oldRow => oldRow.id !== id)
                            ]
                        })
                        alert("Registro excluído com sucesso.")
                    }
                });
        }
    }
        
    return (
        <div>
            <LayoutBaseDePagina 
                titulo="Listagem de Bancos"
                barraDeFerramentas={
                    <FerramentasDaListagem 
                        mostrarInputBusca
                        labelInput="Informe nome ou número"
                        textoDaBusca={busca}
                        aoClicarEmNovo={() => navigate("/bancos/detalhe/novo")}
                        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: "1" }, { replace: true })}
                    />
                }
            >
                <TableContainer component={Paper} sx={{ m: 1, width: "auto", height: "auto" }} >
                   
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell width={100}>Ações</TableCell>
                                    <TableCell width={100}># </TableCell>
                                    <TableCell width={300}>Nome</TableCell>
                                    <TableCell >Número</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.id} > 
                                        <TableCell>
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleDelete(row.id)}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                            <IconButton 
                                                size="small" 
                                                onClick={() => navigate(`/bancos/detalhe/${row.id}`)}
                                            >
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.nome}</TableCell>
                                        <TableCell>{row.numero}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>  
                            
                            {totalCount === 0 && !isLoading && (
                                <caption>{Environment.LISTAGEM_VAZIA}</caption>
                            )}                  
                            
                            <TableFooter>
                                {isLoading && (  
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                                <LinearProgress variant="indeterminate" />
                                        </TableCell>
                                    </TableRow>
                                )}

                                {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (  
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                                <Pagination 
                                                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                                    page={pagina}
                                                    onChange={(_, newPage) => setSearchParams(
                                                        { busca, pagina: newPage.toString() }, 
                                                        { replace: true })
                                                    }
                                                />
                                        </TableCell>
                                    </TableRow>
                                )}                                
                            </TableFooter>
                        </Table>
                    
                </TableContainer>
            </LayoutBaseDePagina>
        </div>
    )
}