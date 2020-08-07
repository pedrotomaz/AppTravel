using AppTravel.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AppTravel.Infra.Data.Context
{
    public class AppTravelContext : DbContext
    {
        public AppTravelContext()
        {
        }

        public AppTravelContext(DbContextOptions<AppTravelContext> options) : base(options) { }


        #region Mapeamento das entidades
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<Local> Local { get; set; }
        public virtual DbSet<Avaliacao> Avaliacao { get; set; }
        public virtual DbSet<Interesse> Interesse { get; set; }
        #endregion
    }
}
