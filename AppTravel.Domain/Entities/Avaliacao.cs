using System;
using System.Collections.Generic;
using System.Text;

namespace AppTravel.Domain.Entities
{
    public class Avaliacao
    {
        public string id { get; set; }
        public string usuarioId { get; set; }
        public string localId { get; set; }
        public decimal nota { get; set; }

        public void Validate()
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new Exception("O id não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(usuarioId))
                throw new Exception("O usuarioId não pode ser branco ou nulo");

            if (string.IsNullOrWhiteSpace(localId))
                throw new Exception("O localId não pode ser branco ou nulo");
        }
    }
}
