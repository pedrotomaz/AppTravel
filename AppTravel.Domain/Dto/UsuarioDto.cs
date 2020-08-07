using AppTravel.Domain.Entities;
using System;

namespace AppTravel.Domain.Dto
{
    public class UsuarioDto
    {
        public string id { get; set; }
        public string nome { get; set; }
        public string username { get; set; }
        public bool isAdmin { get; set; }
        public bool cadastroConcluido { get; set; }
        

        public static UsuarioDto ConvertToDto(Usuario usuario)
        {
            if (usuario == null)
                return null;

            return new UsuarioDto(){
                id = usuario.id,
                nome = usuario.nome,
                username = usuario.username,
                isAdmin = usuario.isAdmin,
                cadastroConcluido = usuario.cadastroConcluido
            };
        }

        public void Validate()
        {
            if (string.IsNullOrWhiteSpace(nome))
                throw new Exception("O nome não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(username))
                throw new Exception("O usename não pode ser branco ou nulo");
        }
    }
}
