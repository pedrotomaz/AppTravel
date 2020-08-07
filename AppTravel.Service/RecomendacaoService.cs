using AppTravel.Domain.Dto;
using AppTravel.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppTravel.Service
{
    public class RecomendacaoService
    {
        private readonly UsuarioService _usuarioService;
        private readonly LocalService _localService;
        private readonly AvaliacaoService _avaliacaoService;

        public RecomendacaoService(UsuarioService usuarioService, LocalService localService, AvaliacaoService avaliacaoService)
        {
            _usuarioService = usuarioService;
            _localService = localService;
            _avaliacaoService = avaliacaoService;
        }







        public ICollection<Local> GetRecomendacao(string usuarioId)
        {
            ICollection<Local> recomendacoes = new List<Local>();

            // Retorna as previsões de avaliações com ID do local e o valor da previsão de avaliação
            Dictionary<string, double> previsoes = GetPrevision(usuarioId);

            foreach (var item in previsoes)
            {
                Local local = _localService.Get(item.Key);
                Avaliacao recom = new Avaliacao()
                {
                    id = "",
                    localId = local.id,
                    usuarioId = usuarioId,
                    nota = item.Value.ToString() == "NaN" ? 0 : Convert.ToDecimal(item.Value)
                };

                // Recomendações com valor acima de 3 
                if (recom.nota >= 3)
                {
                    local.avaliacao = recom;

                    recomendacoes.Add(local); 
                }
            }

            return recomendacoes.OrderByDescending(x => x.avaliacao.nota).ToList();
        }


        #region Private Methods
        private Dictionary<string, double> GetPrevision(string id)
        {
            #region Inicialização das variáveis
            // Lista de similaridades
            Dictionary<string, double> similaridade = new Dictionary<string, double>();

            // Usuário Principal
            UsuarioDto usuarioPrincipal = _usuarioService.GetDto(id);

            // Lista de avaliações do usuarioPrincipal
            List<Avaliacao> avaliacoesUsuaioPrincipal = _avaliacaoService.GetAllByUsuario(usuarioPrincipal.id).ToList();

            // Lista de avaliações dos outros usuários, com os mesmos filmes que o usuário principal avaliou
            // Listar todas avaliações
            List<Avaliacao> avaliacoesOutrosUsuarios = _avaliacaoService.GetAll().ToList();
            // Ordenar por usuarioId
            avaliacoesOutrosUsuarios = avaliacoesOutrosUsuarios.OrderBy(x => x.usuarioId).ToList();
            // Filtrar para excluir as avaliações do usuario principal dessa lista
            avaliacoesOutrosUsuarios = avaliacoesOutrosUsuarios.Where(x => x.usuarioId != usuarioPrincipal.id).ToList();

            // separar cada usuário com a sua lista de avaliações
            List<Usuario> outrosUsuarios = _usuarioService.GetAll().Where(x => x.id != usuarioPrincipal.id).ToList();
            #endregion

            #region Calcular Distância Euclidiana
            // Calcular a Distância Euclidiana do usuário principal com cada outro usuário
            foreach (Usuario outroUsuario in outrosUsuarios)
            {
                List<Avaliacao> avaliacoesOutroUsuario = _avaliacaoService.GetAllByUsuario(outroUsuario.id).ToList();
                double raiz = DistanciaEuclidiana(avaliacoesUsuaioPrincipal, avaliacoesOutroUsuario);

                // Adicionar a similaridade de cada outro usuário na lista de similares
                similaridade.Add(outroUsuario.id, raiz);
            }
            #endregion

            #region Listar Similaridades
            List<Similaridade> similaridadesPrincipal = GetSimilares(similaridade, usuarioPrincipal.id);
            #endregion

            #region Listar os locais que o usuario principal ainda não avaliou
            List<Local> lstFilmesNaoAvaliadosPrincipal = _localService.GetAll().Where(x => !avaliacoesUsuaioPrincipal.Exists(p => p.localId == x.id)).ToList();
            #endregion

            #region Listar previsão de avaliações
            Dictionary<string, double> previsoes = GetSimilaridadePonderada(similaridadesPrincipal, outrosUsuarios, lstFilmesNaoAvaliadosPrincipal);
            #endregion

            return previsoes;
        }

        
        private double DistanciaEuclidiana(List<Avaliacao> avaliacoesPrincipal, List<Avaliacao> avaliacoesOutro)
        {
            // para cada outro usuário, vou comparar as avaliações do mesmo local entre o usuário principal e o outro
            double somatorio = 0;

            foreach (Avaliacao avaliacaoOutro in avaliacoesOutro)
            {
                Local localOutro = _localService.Get(avaliacaoOutro.localId);
                foreach (Avaliacao avaliacaoPrincipal in avaliacoesPrincipal)
                {
                    if (avaliacaoOutro.localId == avaliacaoPrincipal.localId)
                    {
                        #region Distância Euclidiana
                        // Subtração (Xi - Yi)
                        double subtracao = Convert.ToDouble(avaliacaoPrincipal.nota) - Convert.ToDouble(avaliacaoOutro.nota);
                        // Potência (Xi - Yi)^2 
                        double potencia = Math.Pow(subtracao, 2);

                        // Somatório 
                        somatorio += potencia;
                        #endregion
                    }
                }
            }

            // Raiz Quadrada
            double raiz = somatorio > 0 ? 1 / (1 + Math.Sqrt(somatorio)) : 0;

            return raiz;
        }


        private List<Similaridade> GetSimilares(Dictionary<string, double> lstSimilaridade, string usuarioPrincipalId)
        {
            List<Similaridade> similares = new List<Similaridade>();
            foreach (var item in lstSimilaridade)
            {
                Similaridade similaridade = new Similaridade()
                {
                    usuarioId = usuarioPrincipalId,
                    usuarioSimilarId = item.Key,
                    valor = Convert.ToDecimal(item.Value),
                    usuarioSimilar = _usuarioService.Get(item.Key)
                };

                similares.Add(similaridade);
            }

            return similares.OrderByDescending(x => x.valor).ToList();
        }


        private Dictionary<string, double> GetSimilaridadePonderada(List<Similaridade> similares, List<Usuario> outrosUsuarios, List<Local> locaisNaoAvaliadosUsuarioPrincipal)
        {
            List<Similaridade> similaridadesPonderada = new List<Similaridade>();
            Dictionary<string, double> avaliacoesPrevistas = new Dictionary<string, double>();
            bool hasRating = true;

            foreach (Local local in locaisNaoAvaliadosUsuarioPrincipal)
            {
                double valorSimilaridade = 0;
                double notaAvaliacao = 0;
                double total = 0;
                double somaSim = 0;

                foreach (Similaridade s in similares)
                {
                    valorSimilaridade = Convert.ToDouble(s.valor);

                    Avaliacao aval = _avaliacaoService.GetByUsuarioAndLocal(s.usuarioSimilarId, local.id);
                    
                    hasRating = aval != null ? true : false;

                    if (hasRating)
                    {
                        notaAvaliacao = aval != null ? Convert.ToDouble(aval.nota) : 0;

                        double total1 = valorSimilaridade * notaAvaliacao;
                        total += total1;

                        double somaSim1 = aval != null ? Convert.ToDouble(s.valor) : 0;
                        somaSim += somaSim1; 
                    }
                }

                // para cada local, tenho a previsão de avaliação do usuário principal.
                double totalSoma = total / somaSim;
                if (totalSoma > 0)
                    avaliacoesPrevistas.Add(local.id, totalSoma);

            }

            return avaliacoesPrevistas;
        }
        #endregion
    }
}
