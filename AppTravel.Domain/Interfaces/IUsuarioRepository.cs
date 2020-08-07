using AppTravel.Domain.Entities;
using System.Collections.Generic;

namespace AppTravel.Domain.Interfaces
{
    public interface IUsuarioRepository : ICrudRepository<Usuario>
    {
        Usuario Authenticate(string username, string senha);
        ICollection<Usuario> GetByUsername(string username);
    }
}
