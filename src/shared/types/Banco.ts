
export type TDetalheBanco = {
    id: number;
    nome: string;
    numero: string;
}

export type TListagemBanco = {
    id: number;
    nome: string;
    numero: string;
}

export type TBancosComTotalCount = {
    data: TListagemBanco[];
    totalCount: number;
}