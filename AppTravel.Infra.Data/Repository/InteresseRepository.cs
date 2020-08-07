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
    public class InteresseRepository : IInteresseRepository
    {
        private readonly AppTravelContext _context;



        public InteresseRepository(AppTravelContext context)
        {
            _context = context;
        }



        public Interesse Create(Interesse obj)
        {
            _context.Interesse.Add(obj);
            _context.SaveChanges();

            return _context.Interesse.FirstOrDefault(x => x.id == obj.id);
        }

        public void Delete(Interesse obj)
        {
            _context.Interesse.Remove(obj);
            _context.SaveChanges();
        }

        public Interesse Get(string id)
        {
            return _context.Interesse.FirstOrDefault(x => x.id == id);
        }

        public ICollection<Interesse> GetAll()
        {
            return _context.Interesse.ToList();
        }

        public ICollection<Interesse> GetAllByUsuario(string id)
        {
            return _context.Interesse.Where(x => x.usuarioId == id).ToList();
        }

        public ICollection<Interesse> GetAllByUsuarioAndLocal(string usuarioId, string localId)
        {
            return _context.Interesse.Where(x => x.usuarioId == usuarioId && x.localId == localId).ToList();
        }

        public Interesse Update(Interesse obj)
        {
            _context.Interesse.Update(obj);
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();

            return _context.Interesse.FirstOrDefault(x => x.id == obj.id);
        }
    }
}
