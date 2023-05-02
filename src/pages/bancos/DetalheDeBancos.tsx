/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Form } from "@unform/web";

import { BancosService } from "../../shared/services/api/bancos/BancosService";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms";


export const DetalheDeBancos = () => {
    const { id = "novo" }  = useParams<"id">();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState("");

    useEffect(() => {
        if(id !== "novo") {
            setIsLoading(true);

            BancosService.findById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if(result instanceof Error) {
                        alert(result.message);
                        navigate("/bancos");
                    }else {
                        setNome(result.nome);
                        console.log(result);
                    }
                })
        }
    }, [id]);


    const handleSave = () => {

    }

    const handleDelete = (id: number) => {
        if(confirm("Deseja realmente apagar?")) {
            BancosService.deleteById(id)
                .then(result => {
                    if(result instanceof Error) {
                        alert(result.message)
                    } else {
                        alert("Registro excluído com sucesso.")
                        navigate("/bancos");
                    }
                });
        }
    }

    return(
        <LayoutBaseDePagina
            titulo={id === "novo" ? "Novo Banco" : nome }
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo={id !== "novo"}
                    mostrarBotaoApagar={id !== "novo"}

                    aoClicarEmSalvar={() => handleSave()}
                    aoClicarEmSalvarEVoltar={() => handleSave()}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate("/bancos/detalhe/novo")}
                    aoClicarEmVoltar={() => navigate("/bancos")}
                />
            }
        >
            <Form 
                onSubmit={console.log}
            >
                <VTextField 
                    name="nome" 
                    label="Teste" 
                />
            </Form>
        </LayoutBaseDePagina>
    )
}