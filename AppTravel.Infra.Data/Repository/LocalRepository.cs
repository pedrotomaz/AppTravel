using AppTravel.Domain.Entities;
using AppTravel.Domain.Interfaces;
using AppTravel.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace AppTravel.Infra.Data.Repository
{
    public class LocalRepository : ILocalRepository
    {
        private readonly AppTravelContext _context;

        public LocalRepository(AppTravelContext context)
        {
            _context = context;
        }

        public Local Create(Local obj)
        {
            _context.Local.Add(obj);
            _context.SaveChanges();

            return obj;
        }

        public void Delete(Local obj)
        {
            _context.Local.Remove(obj);
            _context.SaveChanges();
        }

        public Local Get(string id)
        {
            return _context.Local.FirstOrDefault(x => x.id == id);
        }

        public ICollection<Local> GetAll()
        {
            return _context.Local.ToList();
        }

        public Local Update(Local obj)
        {
            _context.Local.Update(obj);
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();

            //return _context.Local.Find(obj.id);
            return _context.Local.FirstOrDefault(x => x.id == obj.id);
        }

        public ICollection<Local> GetAllByCity(string cidade)
        {
            return _context.Local.Where(x=>x.cidade.ToLower() == cidade.ToLower()).ToList();
        }

        public ICollection<Local> GetAllByUf(string uf)
        {
            return _context.Local.Where(x => x.uf.ToLower() == uf.ToLower()).ToList();
        }
    }
}
