
export type TTipoConta = "BANCARIA" | "FINANCEIRA";

export type TDetalheContas = {
    id: number;
    descricao: string;
    tipo: TTipoConta;
    saldo: number;
    dataAlteracao: Date;
    numero: string;
    digito: string;
    agencia: string;
    digitoAgencia: string;
    bancoId: number;
}

export type TListagemContas = {
    id: number;
    descricao: string;
    tipo: TTipoConta;
    saldo: number;
}

export type TContasComTotalCount = {
    data: TListagemContas[];
    totalCount: number;
}