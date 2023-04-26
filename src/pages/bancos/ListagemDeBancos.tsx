import { useMemo } from "react";

import { Typography } from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { useSearchParams } from "react-router-dom";

export const ListagemDeBancos: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
 
    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

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