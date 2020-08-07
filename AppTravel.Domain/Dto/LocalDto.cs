using AppTravel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace AppTravel.Domain.Dto
{
    public class LocalDto
    {
        public string id { get; set; }
        public string nome { get; set; }
        public string telefone { get; set; }
        public string cep { get; set; }
        public string rua { get; set; }
        public string numero { get; set; }
        public string complemento { get; set; }
        public string bairro { get; set; }
        public string cidade { get; set; }
        public string uf { get; set; }
        public string pais { get; set; }
        public string descricao { get; set; }
        public string nomeImagem { get; set; }
        public Stream imagem { get; set; }

        public virtual Avaliacao avaliacao { get; set; }

        public static LocalDto ConvertToDto(Local local)
        {
            if (local == null)
                return null;

            return new LocalDto() {
                id = local.id,
                nome = local.nome,
                telefone = local.telefone,
                cep = local.cep,
                rua = local.rua,
                numero = local.numero,
                complemento = local.complemento,
                bairro = local.bairro,
                cidade = local.cidade,
                uf = local.uf,
                pais = local.pais,
                descricao = local.descricao,
                nomeImagem = local.nomeImagem
            };
        }
    }
}
