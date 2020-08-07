using AppTravel.Domain.Entities;
using AppTravel.Domain.Interfaces;
using AppTravel.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AppTravel.Infra.Data.Repository
{
    public class AvaliacaoRepository : IAvaliacaoRepository
    {
        private readonly AppTravelContext _context;

        public AvaliacaoRepository(AppTravelContext context)
        {
            _context = context;
        }

        public Avaliacao Create(Avaliacao obj)
        {
            _context.Avaliacao.Add(obj);
            _context.SaveChanges();

            return obj;
        }

        public void Delete(Avaliacao obj)
        {
            _context.Avaliacao.Remove(obj);
            _context.SaveChanges();
        }

        public Avaliacao Get(string id)
        {
            return _context.Avaliacao.FirstOrDefault(x => x.id == id);
        }

        public ICollection<Avaliacao> GetAll()
        {
            return _context.Avaliacao.ToList();
        }

        public Avaliacao Update(Avaliacao obj)
        {
            _context.Avaliacao.Update(obj);
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();

            return _context.Avaliacao.FirstOrDefault(x => x.id == obj.id);
        }

        public ICollection<Avaliacao> GetAllByUsuario(string usuarioId)
        {
            return _context.Avaliacao.Where(x => x.usuarioId == usuarioId).ToList();
        }
        
        public ICollection<Avaliacao> GetAllByLocal(string localId)
        {
            return _context.Avaliacao.Where(x => x.localId == localId).ToList();
        }

        public Avaliacao GetByUsuario(string usuarioId)
        {
            return _context.Avaliacao.FirstOrDefault(x => x.usuarioId == usuarioId);
        }

        public Avaliacao GetByLocal(string localId)
        {
            return _context.Avaliacao.FirstOrDefault(x => x.localId == localId);
        }

        public ICollection<Avaliacao> GetAllByUsuarioAndLocal(string usuarioId, string localId)
        {
            return _context.Avaliacao.Where(x => x.usuarioId == usuarioId && x.localId == localId).ToList();
        }

        public Avaliacao GetByUsuarioAndLocal(string usuarioId, string localId)
        {
            var a = _context.Avaliacao.FirstOrDefault(x => x.usuarioId == usuarioId && x.localId == localId);
            return a;
        }
    }
}
