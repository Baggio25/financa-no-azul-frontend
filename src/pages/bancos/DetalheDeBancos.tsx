/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Divider, Grid, LinearProgress, Paper, Typography } from "@mui/material";
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
                        navigate("/bancos");
                        toast.error(result.message);                        
                    }else {
                        setNome(result.nome);
                        formRef.current?.setData(result);
                    }
                })
        }

    }, [id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        
        if(id === "novo") {
            BancosService
                .create(dados)
                .then((result) => {
                    setIsLoading(false);

                    if(result instanceof Error) {
                        toast.error(result.message);
                    }else {
                        navigate(`/bancos/detalhe/${result}`)
                        toast.success("Banco salvo com sucesso!");
                    }
                });
            }else {
                BancosService
                .updateById(Number(id), {id: Number(id), ...dados})
                .then((result) => {
                    setIsLoading(false);
                    
                    if(result instanceof Error) {
                        toast.error(result.message);
                    }else {
                        toast.success("Banco alterado com sucesso!");
                    }
                });
        }
    }


    const handleDelete = (id: number) => {
        if(confirm("Deseja realmente apagar?")) {
            BancosService.deleteById(id)
                .then(result => {
                    if(result instanceof Error) {
                        toast.error(result.message);
                    } else {
                        toast.success("Registro excluído com sucesso.")
                        navigate("/bancos");
                    }
                });
        }
    }

    const handleClear = () => {
        formRef.current?.reset();
        navigate("/bancos/detalhe/novo");
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
                    aoClicarEmNovo={() => handleClear()}
                    aoClicarEmVoltar={() => navigate("/bancos")}
                />
            }
        >
            <Form 
                onSubmit={handleSave}
                ref={formRef}
            >
                <Box 
                    component={Paper} 
                    margin={1} 
                    display="flex" 
                    flexDirection="column"
                    variant="outlined"
                >
                    <Grid 
                        container 
                        spacing={2} 
                        direction="column" 
                        padding={2}
                    >
                        {isLoading && (
                            <Grid item >
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}

                        <Grid item sx={{ mb: 1 }}>
                            <Typography>Dados Principais</Typography>
                            <Divider />
                        </Grid>                        

                        <Grid container item direction="row" spacing={2} >
                            <Grid item xs={12} sm={6} >
                                <VTextField 
                                    name="nome" 
                                    label="Banco" 
                                    autoFocus
                                    fullWidth
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <VTextField 
                                    name="numero" 
                                    label="Número" 
                                    fullWidth
                                    disabled={isLoading}
                                />
                            </Grid>   
                        </Grid>
                    </Grid>                    
                </Box>
            </Form>

        </LayoutBaseDePagina>
    )
}