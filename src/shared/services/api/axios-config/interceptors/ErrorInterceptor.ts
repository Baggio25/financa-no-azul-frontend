import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {

    
    if(error.response?.status === 400) {
        return Promise.reject(new Error("Erro de conexão com o servidor."));
    }

    if(error.response?.status === 401) {
        return Promise.reject(new Error("Problema nas credenciais. Você não está autorizado ao acesso"));
    }

    if(error.response?.status === 404) {
        return Promise.reject(new Error("URL não encontrada."));
    }


    return Promise.reject(error);
}