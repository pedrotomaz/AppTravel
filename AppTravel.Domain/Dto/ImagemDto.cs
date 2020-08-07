using System;
using System.Collections.Generic;
using System.Text;

namespace AppTravel.Domain.Dto
{
    public class ImagemDto
    {
        public string localId { get; set; }
        public string fileName { get; set; }
        public byte[] file { get; set; }
    }
}
