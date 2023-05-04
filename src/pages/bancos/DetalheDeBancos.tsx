/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Box, Divider, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { BancosService } from "../../shared/services/api/bancos/BancosService";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";

interface IFormData {
    nome: string;
    numero: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3),
    numero: yup.string()
                .required()
                .max(3, "Deve possuir 3 caracteres")
                .min(3, "Deve possuir 3 caracteres")
                .matches(/^\d+$/, "Deve ser informado apenas números")
});

export const DetalheDeBancos = () => {
    const { id = "novo" }  = useParams<"id">();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
        }else {
            formRef.current?.setData({
                nome: "",
                numero: ""
            })
        }

    }, [id]);

    const handleSave = (dados: IFormData) => {

        formValidationSchema.validate(dados, { abortEarly: false })
        .then((dadosValidados) => {
                setIsLoading(true);
                if(id === "novo") {
                    BancosService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
        
                            if(result instanceof Error) {
                                toast.error(result.message);
                            }else {
                                if(isSaveAndClose()) {
                                    navigate("/bancos");
                                }else {
                                    navigate(`/bancos/detalhe/${result}`)
                                }
        
                                toast.success("Banco salvo com sucesso!");
                            }
                        });
                    }else {
                        BancosService
                        .updateById(Number(id), {id: Number(id), ...dadosValidados})
                        .then((result) => {
                            setIsLoading(false);
                            
                            if(result instanceof Error) {
                                toast.error(result.message);
                            }else {
                                if(isSaveAndClose()) {
                                    navigate("/bancos");
                                }
                                toast.success("Banco alterado com sucesso!");
                            }
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};
                
                errors.inner.forEach(error => {
                    if(!error.path) return;

                    validationErrors[error.path] = error.message;
                });

                formRef.current?.setErrors(validationErrors);
            });

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

    const handleNew = () => {
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

                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEVoltar={saveAndClose}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => handleNew()}
                    aoClicarEmVoltar={() => navigate("/bancos")}
                />
            }
        >
            <VForm  
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
            </VForm>

        </LayoutBaseDePagina>
    )
}