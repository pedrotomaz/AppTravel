using AppTravel.Domain.Entities;
using AppTravel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AppTravel.Service
{
    public class InteresseService
    {
        private readonly IInteresseRepository _interesseRepository;
        private readonly ILocalRepository _localRepository;
        private readonly IAvaliacaoRepository _avaliacaoRepositoy;



        public InteresseService(IInteresseRepository interesseRepository, ILocalRepository localRepository, IAvaliacaoRepository avaliacaoRepositoy)
        {
            _interesseRepository = interesseRepository;
            _localRepository = localRepository;
            _avaliacaoRepositoy = avaliacaoRepositoy;
        }



        public Interesse Create(Interesse obj)
        {
            if (obj == null)
                throw new Exception("O interesse não pode ser nulo");

            Interesse interesse = null;

            obj.id = Guid.NewGuid().ToString();

            #region Verificar se o interesse já está na lista de interesses
            List<Interesse> lstInteresse = _interesseRepository.GetAllByUsuario(obj.usuarioId).ToList();
            if(lstInteresse != null && lstInteresse.Count > 0)
            {
                if (!lstInteresse.Exists(x => x.usuarioId == obj.usuarioId && x.localId == obj.localId))
                    interesse = _interesseRepository.Create(obj);
            }
            else
            {
                interesse =_interesseRepository.Create(obj);
            }
            #endregion

            return interesse;
        }

        public void Delete(Interesse obj)
        {
            if (obj == null)
                throw new Exception("o Interesse não pde ser nulo");

            _interesseRepository.Delete(obj);
        }

        public Interesse Update(Interesse obj)
        {
            if (obj == null)
                throw new Exception("O Interesse não pode ser nulo");

            return _interesseRepository.Update(obj);
        }

        public Interesse Get(string id)
        {
            return _interesseRepository.Get(id);
        }

        public ICollection<Interesse> GetAll()
        {
            return _interesseRepository.GetAll();
        }

        public ICollection<Interesse> GetAllByUsuario(string id)
        {
            return _interesseRepository.GetAllByUsuario(id);
        }

        public ICollection<Interesse> GetAllBysuarioAndLocal(string usuarioId, string localId)
        {
            return _interesseRepository.GetAllByUsuarioAndLocal(usuarioId, localId);
        }
        

        public ICollection<Local> GetInterestListByUsuario(string usuarioId)
        {
            ICollection<Interesse> interesses = _interesseRepository.GetAllByUsuario(usuarioId);
            ICollection<Local> locais = new List<Local>();
            foreach (Interesse interesse in interesses)
            {
                Local local = _localRepository.Get(interesse.localId);
                if (local != null)
                {
                    //local.avaliacao = _avaliacaoRepositoy.GetByUsuarioAndLocal(interesse.usuarioId, interesse.localId);
                    locais.Add(local);
                }
            }

            return locais.OrderBy(x => x.nome).ToList();
        }
    }
}
