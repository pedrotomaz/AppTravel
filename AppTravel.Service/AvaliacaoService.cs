using AppTravel.Domain.Entities;
using AppTravel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppTravel.Service
{
    public class AvaliacaoService
    {
        private readonly IAvaliacaoRepository _avaliacaoRepository;
        private readonly InteresseService _interesseService;

        public AvaliacaoService(IAvaliacaoRepository avaliacaoRepository, InteresseService interesseService)
        {
            _avaliacaoRepository = avaliacaoRepository;
            _interesseService = interesseService;
        }

        public Avaliacao Create(Avaliacao avaliacao)
        {
            if (avaliacao == null)
                throw new Exception("A avaliação não pode ser nulo");

            avaliacao.id = Guid.NewGuid().ToString();
            avaliacao.Validate();

            Avaliacao result = _avaliacaoRepository.Create(avaliacao);

            #region eliminar local da lista de interesse, após ser avaliado
            List<Interesse> lstInteresses = _interesseService.GetAllBysuarioAndLocal(result.usuarioId, result.localId).ToList();
            
            if(lstInteresses != null && lstInteresses.Count > 0)
            {
                foreach (Interesse interesse in lstInteresses)
                {
                    _interesseService.Delete(interesse);
                }
            }
            #endregion

            return result;
        }

        public Avaliacao Update(Avaliacao avaliacao)
        {
            if (avaliacao == null)
                throw new Exception("O usuário não pode ser nulo");

            //avaliacao.id = Guid.NewGuid().ToString();
            avaliacao.Validate();

            return _avaliacaoRepository.Update(avaliacao);
        }


        public void CreateAll(Avaliacao[] avaliacoes)
        {
            foreach (Avaliacao avaliacao in avaliacoes)
            {
                Create(avaliacao);
            }
        }

        public void Delete(string id)
        {
            Avaliacao avaliacao = _avaliacaoRepository.Get(id);

            if (avaliacao == null)
                throw new Exception("Avaliação não encontrada");

            _avaliacaoRepository.Delete(avaliacao);
        }

        public Avaliacao Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new Exception("Id não encontrado");

            Avaliacao avaliacao = _avaliacaoRepository.Get(id);

            if (avaliacao == null)
                throw new Exception("Usuário não encontrado");

            return avaliacao;

        }

        public ICollection<Avaliacao> GetAll()
        {
            return _avaliacaoRepository.GetAll();
        }

        public Avaliacao GetByUsuario(string usuarioId)
        {
            if (string.IsNullOrWhiteSpace(usuarioId))
                throw new Exception("Id não encontrado");

            return _avaliacaoRepository.GetByUsuario(usuarioId);
        }

        public Avaliacao GetByLocal(string localId)
        {
            if (string.IsNullOrWhiteSpace(localId))
                throw new Exception("Id não encontrado");

            return _avaliacaoRepository.GetByLocal(localId);
        }

        public Avaliacao GetByUsuarioAndLocal(string usuarioId, string localId)
        {
            if (string.IsNullOrWhiteSpace(usuarioId))
                throw new Exception("Id não encontrado");

            return _avaliacaoRepository.GetByUsuarioAndLocal(usuarioId, localId);
        }

        public ICollection<Avaliacao> GetAllByUsuario(string usuarioId)
        {
            return _avaliacaoRepository.GetAllByUsuario(usuarioId);
        }

        public ICollection<Avaliacao> GetAllByLocal(string localId)
        {
            return _avaliacaoRepository.GetAllByLocal(localId);
        }

        public ICollection<Avaliacao> GetAllByUsuarioAndLocal(string usuarioId, string localId)
        {
            return _avaliacaoRepository.GetAllByUsuarioAndLocal(usuarioId, localId);
        }


    }
}
