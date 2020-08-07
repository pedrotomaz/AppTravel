using AppTravel.Service;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AppTravel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecomendacaoController : ControllerBase
    {
        private readonly RecomendacaoService _recomendacaoService;

        public RecomendacaoController(RecomendacaoService recomendacaoService)
        {
            _recomendacaoService = recomendacaoService;
        }


        [HttpGet("getHint")]
        public IActionResult GetHint(string id)
        {
            try
            {
                var previsoes = _recomendacaoService.GetRecomendacao(id);

                return Ok(previsoes);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
                throw;
            }
        }
    }
}