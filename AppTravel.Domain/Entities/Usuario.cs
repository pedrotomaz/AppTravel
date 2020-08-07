using System;

namespace AppTravel.Domain.Entities
{
    public class Usuario
    {
        public string id { get; set; }
        public string nome { get; set; }
        public string username { get; set; }
        public string senha { get; set; }
        public bool isAdmin { get; set; }
        public bool cadastroConcluido { get; set; }

        public void Validate()
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new Exception("O Id não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(nome))
                throw new Exception("O nome não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(username))
                throw new Exception("O username não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(senha))
                throw new Exception("A senha não pode ser branco ou nulo");
        }
        

        public void Format()
        {
            nome = nome.Trim();
            username = username.Trim().ToUpper();            
        }

        public void ConcluirCadastro()
        {
            cadastroConcluido = true;
        }
    }
}
