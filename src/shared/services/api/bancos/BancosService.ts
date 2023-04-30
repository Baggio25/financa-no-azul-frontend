import { Api } from "../axios-config";
import { Environment } from "../../../environment";
import { TBancosComTotalCount, TDetalheBanco } from "../../../types/Banco";

const findAllByNomeOrNumero = async (page = 1, filter = ""): Promise<TBancosComTotalCount | Error> => {
    try {

        let urlRelativa = "";

        if(filter !== "" && filter.length > 3) {
            urlRelativa = `/bancos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;            
        }else if (filter !== "" && filter.length <= 3) {
            urlRelativa = `/bancos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&numero_like=${filter}`;
        }else {
            urlRelativa = `/bancos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}`;
        }
        
        const { data, headers } = await Api.get(urlRelativa);

        if(data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            };
        }

        return new Error("Erro ao listar os registros");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};

const findById = async (id: number): Promise<TDetalheBanco | Error> => {
    try {
        const { data } = await Api.get(`/bancos/${id}`);

        if(data) return data;        

        return new Error("Erro ao buscar o registro");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao buscar o registro.');
    }
};

const create = async (dados: Omit<TDetalheBanco, "id">): Promise<number | Error> => {
    try {
        const { data } = await Api.post<TDetalheBanco>("/bancos", dados);

        if(data) return data.id;        

        return new Error("Erro ao criar o registro");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: TDetalheBanco): Promise<void | Error> => {
    try {
        await Api.put<TDetalheBanco>(`/bancos/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete<TDetalheBanco>(`/bancos/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao excluir o registro.');
    }
};

export const BancosService = {
    findAllByNomeOrNumero,
    findById,
    create,
    updateById,
    deleteById
}