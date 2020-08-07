using AppTravel.Domain.Entities;
using System.Collections.Generic;

namespace AppTravel.Domain.Interfaces
{
    public interface IInteresseRepository : ICrudRepository<Interesse>
    {
        ICollection<Interesse> GetAllByUsuario(string id);
        ICollection<Interesse> GetAllByUsuarioAndLocal(string usuarioId, string localId);
    }
}
