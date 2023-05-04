import { Api } from "../axios-config";
import { Environment } from "../../../environment";
import { TContasComTotalCount, TDetalheContas } from "../../../types/Conta";

const findAllByDescricao = async (page = 1, filter = ""): Promise<TContasComTotalCount | Error> => {
    try {

        const urlRelativa = `/contas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&descricao_like=${filter}`;            
        
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

const findById = async (id: number): Promise<TDetalheContas | Error> => {
    try {
        const { data } = await Api.get(`/contas/${id}`);

        if(data) return data;        

        return new Error("Erro ao buscar o registro");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao buscar o registro.');
    }
};

const create = async (dados: Omit<TDetalheContas, "id">): Promise<number | Error> => {
    try {
        const { data } = await Api.post<TDetalheContas>("/contas", dados);

        if(data) return data.id;        

        return new Error("Erro ao criar o registro");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: TDetalheContas): Promise<void | Error> => {
    try {
        await Api.put<TDetalheContas>(`/contas/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete<TDetalheContas>(`/contas/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao excluir o registro.');
    }
};

export const ContasService = {
    findAllByDescricao,
    findById,
    create,
    updateById,
    deleteById
}