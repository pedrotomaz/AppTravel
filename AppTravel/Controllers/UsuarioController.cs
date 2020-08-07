using AppTravel.Common.Utils;
using AppTravel.Domain.Dto;
using AppTravel.Domain.Entities;
using AppTravel.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace AppTravel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }


        [HttpPost("create")]
        public IActionResult Create(Usuario usuario)
        {
            try
            {
                UsuarioDto u = _usuarioService.Create(usuario);

                return Ok(u);
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse()
                {
                    Status = 400,
                    Message = e.Message
                });
            }
        }


        [HttpPost("createInternal")]
        public IActionResult CreateInternal(UsuarioDto usuario)
        {
            try
            {
                UsuarioDto u = _usuarioService.CreateInternal(usuario);

                return Ok(u);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost("createAll")]
        public IActionResult CreateAll(Usuario[] usuarios)
        {
            try
            {
                _usuarioService.CreateAll(usuarios);

                return Ok(true);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost("update")]
        public IActionResult Update(UsuarioDto usuario)
        {
            try
            {
                UsuarioDto u = _usuarioService.Update(usuario);

                return Ok(u);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //[HttpPost("concluirCadastro")]
        //public IActionResult ConcluirCadastro(string id)
        //{
        //    try
        //    {
        //        UsuarioDto obj = _usuarioService.ConcluirCadastro(id);

        //        return Ok(obj);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(new ErrorResponse()
        //        {
        //            Status = 400,
        //            Message = e.Message
        //        });
        //    }
        //}
        [HttpPost("concluirCadastro")]
        public IActionResult ConcluirCadastro(UsuarioDto usuario)
        {
            try
            {
                UsuarioDto obj = _usuarioService.ConcluirCadastro(usuario);

                return Ok(obj);
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse()
                {
                    Status = 400,
                    Message = e.Message
                });
            }
        }


        [HttpGet("get/{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                UsuarioDto usuario = _usuarioService.GetDto(id);

                return Ok(usuario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            try
            {
                ICollection<Usuario> usuarios = _usuarioService.GetAll();

                return Ok(usuarios);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(LoginDto login)
        {
            try
            {
                UsuarioDto resp = _usuarioService.Authenticate(login);
                return Ok(resp);
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse() { 
                    Status = 400,
                    Message = e.Message
                });
            }
        }


        [HttpPost("resetPassword")]
        public IActionResult ResetPassword(UsuarioDto usuario)
        {
            try
            {
                _usuarioService.ResetPassword(usuario);

                return Ok(true);
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse()
                {
                    Status = 400,
                    Message = e.Message
                });
            }
        }
        


        [HttpPost("updatedPassword")]
        public IActionResult UpdatedPassword(Usuario usuario)
        {
            try
            {
                _usuarioService.UpdatedPassword(usuario);

                return Ok(true);
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse()
                {
                    Status = 400,
                    Message = e.Message
                });
            }
        }
    }
}