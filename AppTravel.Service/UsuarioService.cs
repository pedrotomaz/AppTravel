using AppTravel.Common;
using AppTravel.Common.Utils;
using AppTravel.Domain.Dto;
using AppTravel.Domain.Entities;
using AppTravel.Domain.Interfaces;
using System;
using System.Collections.Generic;

namespace AppTravel.Service
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }


        public UsuarioDto Create(Usuario usuario)
        {
            if (usuario == null)
                throw new Exception("O usuário não pode ser nulo");

            usuario.id = Guid.NewGuid().ToString();
            
            usuario.Validate();
            usuario.Format();

            if (AlreadyExists(usuario.id, usuario.username))
                throw new Exception("Já existe esse Nome de Usuário cadastrado");

            // Criptografa a senha e busca no banco para validar usuário
            string senhaMD5 = CryptographyUtils.ToMd5(usuario.senha);
            usuario.senha = senhaMD5;

            _usuarioRepository.Create(usuario);

            return UsuarioDto.ConvertToDto(usuario);
        }

        public UsuarioDto CreateInternal(UsuarioDto usuarioDto)
        {
            if (usuarioDto == null)
                throw new Exception("O usuário não pode ser nulo");

            usuarioDto.Validate();

            Usuario usuario = new Usuario()
            {
                id = Guid.NewGuid().ToString(),
                nome = usuarioDto.nome.Trim(),
                username = usuarioDto.username.Trim().ToUpper(),
                senha = usuarioDto.username.Trim().ToUpper(),
                isAdmin = usuarioDto.isAdmin,
                cadastroConcluido = false
            };

            //usuario.Validate();
            usuario.Format();

            if (AlreadyExists(usuario.id, usuario.username))
                throw new Exception("Já existe esse Username cadastrado");

            usuario.senha = CryptographyUtils.ToMd5(usuario.senha);

            _usuarioRepository.Create(usuario);

            return UsuarioDto.ConvertToDto(usuario);
        }

        public void CreateAll(Usuario[] usuarios)
        {
            foreach (Usuario usuario in usuarios)
            {
                Create(usuario);
            }
        }

        public UsuarioDto Update(UsuarioDto usuarioDto)
        {
            if (usuarioDto == null)
                throw new Exception("O usuário não pode ser nulo");

            Usuario usuario = _usuarioRepository.Get(usuarioDto.id);

            usuario.nome = usuarioDto.nome;
            usuario.username = usuarioDto.username;
            usuario.isAdmin = usuarioDto.isAdmin;
            
            usuario.Validate();
            usuario.Format();

            if (AlreadyExists(usuario.id, usuario.username))
                throw new Exception("Já existe esse Username cadastrado");

            _usuarioRepository.Update(usuario);

            return UsuarioDto.ConvertToDto(usuario);
        }

        public void Delete(string id)
        {
            Usuario usuario = _usuarioRepository.Get(id);
            
            if (usuario == null)
                throw new Exception("Usuário não encontrado");

            _usuarioRepository.Delete(usuario);
        }

        public Usuario Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new Exception("Id não encontrado");

            Usuario usuario = _usuarioRepository.Get(id);

            if (usuario == null)
                throw new Exception("Usuário não encontrado");

            return usuario;

        }

        public UsuarioDto GetDto(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new Exception("Id não encontrado");

            Usuario usuario = _usuarioRepository.Get(id);

            if (usuario == null)
                throw new Exception("Usuário não encontrado");

            return UsuarioDto.ConvertToDto(usuario);

        }

        public ICollection<Usuario> GetAll()
        {
            return _usuarioRepository.GetAll();
        }


        public UsuarioDto Authenticate(LoginDto obj)
        {
            // Criptografa a senha e busca no banco para validar usuário
            string senhaMD5 = CryptographyUtils.ToMd5(obj.senha);
            Usuario usuario = _usuarioRepository.Authenticate(obj.username, senhaMD5);

            if (usuario == null)
                throw new Exception("Usuário/senha inválido(s)");

            
            // Retorna o UsuárioDTO
            return UsuarioDto.ConvertToDto(usuario);
        }

        
        public void ResetPassword(UsuarioDto usuarioDto)
        {
            Usuario usuario = Get(usuarioDto.id);

            if (usuario == null)
                throw new Exception("Usuário não encontrado");

            usuario.senha = CryptographyUtils.ToMd5(usuario.username.ToUpper());

            _usuarioRepository.Update(usuario);
        }



        public void UpdatedPassword(Usuario usuarioSenha)
        {
            Usuario usuario = Get(usuarioSenha.id);

            if (usuario == null)
                throw new Exception("Usuário não encontrado");

            if (string.IsNullOrWhiteSpace(usuarioSenha.senha))
                throw new Exception("A senha não pode ser branca ou nula");

            usuario.senha = CryptographyUtils.ToMd5(usuarioSenha.senha);

            _usuarioRepository.Update(usuario);
        }

        public UsuarioDto ConcluirCadastro(string id)
        {
            Usuario usuario = _usuarioRepository.Get(id);
            
            if (usuario == null)
                throw new Exception("Não foi possível concluir seu cadastro");

            usuario.ConcluirCadastro();

            return UsuarioDto.ConvertToDto( _usuarioRepository.Update(usuario));
        }


        public UsuarioDto ConcluirCadastro(UsuarioDto usuarioDto)
        {
            Usuario usuario = _usuarioRepository.Get(usuarioDto.id);

            if (usuario == null)
                throw new Exception("Não foi possível concluir seu cadastro");

            usuario.ConcluirCadastro();

            return UsuarioDto.ConvertToDto(_usuarioRepository.Update(usuario));
        }


        private bool AlreadyExists(string usuarioId, string username)
        {
            ICollection<Usuario> usuarios = _usuarioRepository.GetByUsername(username);

            foreach (Usuario u in usuarios)
            {
                if (usuarioId != u.id)
                    return true;
            }

            return false;
        }

    }
}
