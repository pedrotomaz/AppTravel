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
    public class InteresseController : ControllerBase
    {
        private readonly InteresseService _interesseService;

        public InteresseController(InteresseService interesseService)
        {
            _interesseService = interesseService;
        }



        [HttpPost("create")]
        public IActionResult Create(Interesse interesse)
        {
            try
            {
                Interesse obj = _interesseService.Create(interesse);

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


        [HttpPost("delete")]
        public IActionResult Delete(Interesse interesse)
        {
            try
            {
                _interesseService.Delete(interesse);

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

        [HttpPost("update")]
        public IActionResult Update(Interesse interesse)
        {
            try
            {
                Interesse obj = _interesseService.Update(interesse);

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


        [HttpPost("get")]
        public IActionResult Get(string id)
        {
            try
            {
                Interesse obj = _interesseService.Get(id);

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

        [HttpPost("getAll")]
        public IActionResult GetAll()
        {
            try
            {
                ICollection<Interesse> lstObj = _interesseService.GetAll();

                return Ok(lstObj);
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

        [HttpPost("getAllByUsuario/{id}")]
        public IActionResult GetAllByUsuario(string id)
        {
            try
            {
                ICollection<Interesse> lstObj = _interesseService.GetAllByUsuario(id);

                return Ok(lstObj);
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

        [HttpGet("getInterestListByUsuario/{usuarioId}")]
        public IActionResult GetInterestListByUsuario(string usuarioId)
        {
            try
            {
                ICollection<Local> lstObj = _interesseService.GetInterestListByUsuario(usuarioId);

                return Ok(lstObj);
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