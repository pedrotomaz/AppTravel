using System.IO;

namespace AppTravel.Common
{
    public class Transformation
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
    }
}
