using AppTravel.Domain.Entities;
using AppTravel.Domain.Interfaces;
using AppTravel.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace AppTravel.Infra.Data.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppTravelContext _context;

        public UsuarioRepository(AppTravelContext context)
        {
            _context = context;
        }

        public Usuario Create(Usuario obj)
        {
            _context.Usuario.Add(obj);
            _context.SaveChanges();

            return obj;
        }

        public void Delete(Usuario obj)
        {
            _context.Usuario.Remove(obj);
            _context.SaveChanges();
        }

        public Usuario Get(string id)
        {
            return _context.Usuario.FirstOrDefault(x => x.id == id);
        }

        public ICollection<Usuario> GetAll()
        {
            return _context.Usuario.ToList();
        }

        public Usuario Update(Usuario obj)
        {
            _context.Usuario.Update(obj);
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();

            return obj;
        }

        public Usuario Authenticate(string username, string senha)
        {
            return _context.Usuario.FirstOrDefault(x => x.username == username.Trim() && x.senha == senha);
        }

        
        public ICollection<Usuario> GetByUsername(string username)
        {
            return _context.Usuario.Where(x => x.username == username).ToList();
        }
    }
}
