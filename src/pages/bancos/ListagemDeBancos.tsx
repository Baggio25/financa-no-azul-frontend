import { useMemo, useEffect } from "react";

import { Typography } from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { useSearchParams } from "react-router-dom";
import { BancosService } from "../../shared/services/api/bancos/BancosService";
import { useDebounce } from "../../shared/hooks";

export const ListagemDeBancos: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
 
    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

    useEffect(() => {
        debounce(() => {            
            BancosService
                .findAllByNome(1, busca)
                .then((result) => {
                    if(result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    
                    console.log(result);
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
                        placeholder="Pesquisar por nome..."
                        textoDaBusca={busca}
                        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                    />
                }
            >
                
                <Typography>Teste</Typography>
            </LayoutBaseDePagina>
        </div>
    )
}