import { useNavigate, useParams } from "react-router-dom";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";

export const DetalheDeBancos = () => {
    const { id = "novo" }  = useParams<"id">();
    const navigate = useNavigate();

    const handleSave = () => {

    }

    const handleDelete = () => {

    }


    return(
        <LayoutBaseDePagina
            titulo="Detalhe de Banco"
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo={id !== "novo"}
                    mostrarBotaoApagar={id !== "novo"}

                    aoClicarEmSalvar={() => handleSave()}
                    aoClicarEmSalvarEVoltar={() => handleSave()}
                    aoClicarEmApagar={() => handleDelete()}
                    aoClicarEmNovo={() => navigate("/bancos/detalhe/novo")}
                    aoClicarEmVoltar={() => navigate("/bancos")}
                />
            }
        >

        </LayoutBaseDePagina>
    )
}