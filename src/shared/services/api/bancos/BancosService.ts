import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import { TBancosComTotalCount } from "../../../types/Banco";

const findAllByNome = async ({page = 1, filter = ""}): Promise<TBancosComTotalCount | Error> => {
    try {
        const urlRelativa = `/bancos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
        const { data, headers } = await Api.get(urlRelativa);

        if(data) {
            return {
                data,
                totalCount: Number(headers["x-total-count"]) || Environment.LIMITE_DE_LINHAS,
            };
        }

        return new Error("Erro ao listar os registros");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};

const findById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const BancosService = {
    findAllByNome,
    findById,
    create,
    updateById,
    deleteById
}