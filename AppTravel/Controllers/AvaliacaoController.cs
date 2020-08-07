using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppTravel.Common.Utils;
using AppTravel.Domain.Entities;
using AppTravel.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppTravel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvaliacaoController : ControllerBase
    {
        private readonly AvaliacaoService _avaliacaoService;

        public AvaliacaoController(AvaliacaoService avaliacaoService)
        {
            _avaliacaoService = avaliacaoService;
        }


        [HttpPost("create")]
        public IActionResult Create(Avaliacao avaliacao)
        {
            try
            {
                _avaliacaoService.Create(avaliacao);

                return Ok(avaliacao);
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


        [HttpPost("update")]
        public IActionResult Update(Avaliacao avaliacao)
        {
            try
            {
                Avaliacao a = _avaliacaoService.Update(avaliacao);

                return Ok(a);
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


        [HttpPost("createAll")]
        public IActionResult CreateAll(Avaliacao[] avaliacoes)
        {
            try
            {
                _avaliacaoService.CreateAll(avaliacoes);

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


        [HttpGet("get/{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                Avaliacao avaliacao = _avaliacaoService.Get(id);

                return Ok(avaliacao);
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


        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            try
            {
                ICollection<Avaliacao> avaliacoes = _avaliacaoService.GetAll();

                return Ok(avaliacoes);
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