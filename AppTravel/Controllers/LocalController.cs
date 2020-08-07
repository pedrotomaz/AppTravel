using AppTravel.Common;
using AppTravel.Common.Utils;
using AppTravel.Domain.Dto;
using AppTravel.Domain.Entities;
using AppTravel.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace AppTravel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocalController : ControllerBase
    {
        private readonly LocalService _localService;
        private readonly RecomendacaoService _recomendacaoService;

        public LocalController(LocalService localService, RecomendacaoService recomendacaoService)
        {
            _localService = localService;
            _recomendacaoService = recomendacaoService;
        }

        [HttpPost("create")]
        public IActionResult Create(Local local)
        {
            try
            {
                _localService.Create(local);

                return Ok(local);
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
        public IActionResult CreateAll(Local[] locais)
        {
            try
            {
                _localService.CreateAll(locais);

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
                LocalDto local = _localService.GetDto(id);

                return Ok(local);
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


        [HttpGet("getByLocalAndUsuario/{id}/{usuarioId}")]
        public IActionResult GetByUsuario(string id, string usuarioId)
        {
            try
            {
                LocalDto local = _localService.GetByLocalAndUsuario(id, usuarioId);

                return Ok(local);
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
                ICollection<Local> locais = _localService.GetAll();

                return Ok(locais);
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


        [HttpGet("getAllByUsuario/{usuarioId}")]
        public IActionResult getAllByUsuario(string usuarioId)
        {
            try
            {
                ICollection<Local> locais = _localService.GetAll(usuarioId);

                return Ok(locais);
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



        [HttpGet("getHint/{usuarioId}")]
        public IActionResult GetHint(string usuarioId)
        {
            try
            {
                var previsoes = _recomendacaoService.GetRecomendacao(usuarioId);

                return Ok(previsoes);
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse(){
                    Status = 400,
                    Message = e.Message 
                });
                
            }
        }


        [HttpPost("update")]
        public IActionResult Update(Local local)
        {
            try
            {
                Local l = _localService.Update(local);

                return Ok(l);
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


        [HttpPost("uploadImage")]
        public IActionResult UploadImage()
        {
            try
            {
                var file = Request.Form.Files[0];
                string localId = Request.Form["localId"].ToString();
                int fileLength = Convert.ToInt32(file.Length);

                Stream stream = file.OpenReadStream();
                byte[] buffer = TransformationUtils.ConvertStreamToByteArray(stream, fileLength);

                ImagemDto imagem = new ImagemDto()
                {
                    file = buffer,
                    fileName = file.Name,
                    localId = localId
                };

                _localService.UploadImagem(imagem, file.Name, file.FileName, fileLength);

                return Ok();
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

        [HttpGet("getImage/{localId}")]
        public IActionResult GetImage(string localId)
        {
            try
            {
                var img = _localService.GetImage(localId);

                return File(img, "application/octet-stream");
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


        [HttpGet("getImage")]
        public IActionResult GetImage1()
        {
            try
            {
                //var img =_localService.GetImage(localId);
                var img = _localService.GetImage11("C:\\TCC\\AppTravel\\AppTravel\\AppTravel\\Resources\\e85b2901-dbd3-47ca-84d6-056e4c916f9e\\imagem.png");

                return File(img, "application/octet-stream");
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


        //[HttpGet("getImage64")]
        //public IActionResult GetImage64()
        //{
        //    try
        //    {

        //        var img = _localService.GetImage64();

        //        return File(img, "application/octet-stream");
        //        //return Ok(img);
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


        [HttpGet("getImage64")]
        public IActionResult GetImage64()
        {
            try
            {

                var img = _localService.GetImage("e85b2901-dbd3-47ca-84d6-056e4c916f9e");

                return File(img, "application/octet-stream");
                //return Ok(img);
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