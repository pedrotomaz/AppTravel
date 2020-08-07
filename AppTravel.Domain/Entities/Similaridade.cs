using System;
using System.Collections.Generic;
using System.Text;

namespace AppTravel.Domain.Entities
{
    public class Similaridade
    {
        public string usuarioId { get; set; }
        public string usuarioSimilarId { get; set; }
        public decimal valor { get; set; }

        public Usuario usuarioSimilar { get; set; }
    }
}
