using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace AppTravel.Common.Utils
{
    public class TransformationUtils
    {
        public static byte[] ConvertStreamToByteArray(Stream stream, int legth)
        {
            byte[] buffer = new byte[legth];

            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }

                return ms.ToArray();
            }
        }


        public static Stream ConvertToBase64(Stream stream)
        {
            byte[] bytes;
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                bytes = memoryStream.ToArray();
            }

            string base64 = Convert.ToBase64String(bytes);
            return new MemoryStream(Encoding.UTF8.GetBytes(base64));
        }
    }
}
