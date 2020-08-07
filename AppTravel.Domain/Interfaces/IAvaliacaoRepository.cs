using AppTravel.Domain.Entities;
using System.Collections.Generic;

namespace AppTravel.Domain.Interfaces
{
    public interface IAvaliacaoRepository : ICrudRepository<Avaliacao>
    {
        ICollection<Avaliacao> GetAllByUsuario(string usuarioId);
        ICollection<Avaliacao> GetAllByLocal(string localId);
        Avaliacao GetByUsuario(string usuarioId);
        Avaliacao GetByLocal(string localId);
        Avaliacao GetByUsuarioAndLocal(string usuarioId, string localId);
        ICollection<Avaliacao> GetAllByUsuarioAndLocal(string usuarioId, string localId);
    }
}
