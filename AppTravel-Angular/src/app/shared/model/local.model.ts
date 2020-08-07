import { Avaliacao } from './avaliacao.model';

export class Local {
    public id: string;
    public nome: string;
    public telefone: string;
    public cep: string;
    public rua: string;
    public numero: string;
    public complemento: string;
    public bairro: string;
    public cidade: string;
    public uf: string;
    public pais: string;
    public descricao: string;
    public imagem: any;

    public avaliacao: Avaliacao;
}
