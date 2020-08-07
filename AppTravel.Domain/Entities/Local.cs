using System;

namespace AppTravel.Domain.Entities
{
    public class Local
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

        public virtual Avaliacao avaliacao { get; set; }

        public void Validate()
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new Exception("O Id não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(nome))
                throw new Exception("O nome não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(cep))
                throw new Exception("O cep não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(rua))
                throw new Exception("A rua não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(numero))
                throw new Exception("O número não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(bairro))
                throw new Exception("O bairro não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(cidade))
                throw new Exception("A cidade não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(uf))
                throw new Exception("O uf não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(pais))
                throw new Exception("O pais não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(descricao))
                throw new Exception("A descrição não pode ser branco ou nula");

            if (descricao.Length < 10)
                throw new Exception("A descrição do local deve conter no mínmo 10 caracteres");
        }
    }
}
