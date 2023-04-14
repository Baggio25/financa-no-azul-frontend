
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const Dashboard = () => {
    return(
        <LayoutBaseDePagina 
            titulo="Dashboard"
            barraDeFerramentas={(
                <FerramentasDeDetalhe 
                    mostrarBotaoVoltar
                    
                    mostrarBotaoNovoCarregando = {false}
                    mostrarBotaoVoltarCarregando = {false}
                    mostrarBotaoApagarCarregando = {false}
                    mostrarBotaoSalvarCarregando = {false}
                    mostrarBotaoSalvarEVoltarCarregando = {false}

                />
            )}>

        </LayoutBaseDePagina>
    )
}