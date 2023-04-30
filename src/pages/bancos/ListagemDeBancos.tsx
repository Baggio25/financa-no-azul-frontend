import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import { BancosService } from "../../shared/services/api/bancos/BancosService";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { TListagemBanco } from "../../shared/types/Banco";

export const ListagemDeBancos: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<TListagemBanco[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
 
    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);
        debounce(() => {            
            BancosService
            .findAllByNome(1, busca)
            .then((result) => {
                    setIsLoading(false);

                    if(result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    setRows(result.data);
                    setTotalCount(result.totalCount); 
                });
        });
    }, [busca]);
        
    return (
        <div>
            <LayoutBaseDePagina 
                titulo="Listagem de Bancos"
                barraDeFerramentas={
                    <FerramentasDaListagem 
                        mostrarInputBusca
                        labelInput="Pesquisar por nome"
                        textoDaBusca={busca}
                        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                    />
                }
            >
                <TableContainer component={Paper} sx={{ m: 1, width: "auto" }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ações</TableCell>
                                <TableCell># </TableCell>
                                <TableCell>Banco</TableCell>
                                <TableCell>Número</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell></TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.nome}</TableCell>
                                    <TableCell>{row.numero}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LayoutBaseDePagina>
        </div>
    )
}