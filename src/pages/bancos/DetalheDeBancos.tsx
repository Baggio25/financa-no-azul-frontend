/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Paper } from "@mui/material";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { BancosService } from "../../shared/services/api/bancos/BancosService";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms";

interface IFormData {
    nome: string;
    numero: string;
}

export const DetalheDeBancos = () => {
    const { id = "novo" }  = useParams<"id">();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

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


    const handleSave = (dados: IFormData) => {
        console.log(dados);
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

                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmSalvarEVoltar={() => formRef.current?.submitForm()}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate("/bancos/detalhe/novo")}
                    aoClicarEmVoltar={() => navigate("/bancos")}
                />
            }
        >
            <Box component={Paper} sx={{ m: 1, p: 1, width: "auto", height: "auto" }}>
                <Form 
                    onSubmit={handleSave}
                    ref={formRef}
                >
                    <VTextField 
                        name="nome" 
                        label="Banco" 
                        autoFocus
                        sx={{ mr: 1, width: 400 }}
                    />
                
                    <VTextField 
                        name="numero" 
                        label="Número" 
                    />
                    
                </Form>
            </Box>
        </LayoutBaseDePagina>
    )
}