using AppTravel.Common;
using AppTravel.Common.Utils;
using AppTravel.Domain.Dto;
using AppTravel.Domain.Entities;
using AppTravel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;

namespace AppTravel.Service
{
    public class LocalService
    {
        private readonly ILocalRepository _localRepository;
        private readonly IAvaliacaoRepository _avaliacaoRepository;

        public LocalService(ILocalRepository localRepository, IAvaliacaoRepository avaliacaoRepository)
        {
            _localRepository = localRepository;
            _avaliacaoRepository = avaliacaoRepository;
        }

        public Local Create(Local local)
        {
            if (local == null)
                throw new Exception("O local não pode ser nulo");

            local.id = Guid.NewGuid().ToString();
            local.Validate();

            return _localRepository.Create(local);
        }

        public void CreateAll(Local[] locais)
        {
            foreach (Local local in locais)
            {
                Create(local);
            }
        }

        public void Delete(string id)
        {
            Local local = _localRepository.Get(id);

            if (local == null)
                throw new Exception("Local não encontrado");

            _localRepository.Delete(local);
        }

        public LocalDto GetDto(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new Exception("Id não encontrado");

            Local local = _localRepository.Get(id);

            if (local == null)
                throw new Exception("Local não encontrado");

            LocalDto localDto = LocalDto.ConvertToDto(local);
            
            return localDto;
        }

        public LocalDto GetByLocalAndUsuario(string localId, string usuarioId)
        {
            if (string.IsNullOrWhiteSpace(localId))
                throw new Exception("Id não encontrado");

            Local local = _localRepository.Get(localId);

            if (local == null)
                throw new Exception("Local não encontrado");

            LocalDto localDto = LocalDto.ConvertToDto(local);

            localDto.avaliacao = _avaliacaoRepository.GetByUsuarioAndLocal(usuarioId, localId);

            return localDto;
        }

        public Local Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new Exception("Id não encontrado");

            Local local = _localRepository.Get(id);

            if (local == null)
                throw new Exception("Local não encontrado");

            return local;
        }

        public ICollection<Local> GetAll()
        {
            return _localRepository.GetAll().OrderBy(x => x.nome).ToList();
        }

        public ICollection<Local> GetAll(string usuarioId)
        {
            ICollection<Local> locais = _localRepository.GetAll().ToList();
            foreach (Local local in locais)
            {
                local.avaliacao = _avaliacaoRepository.GetByUsuarioAndLocal(usuarioId, local.id);
            }

            return locais.OrderBy(x => x.nome).ToList();
        }

        public Local Update(Local local)
        {
            if (local == null)
                throw new Exception("O Local não pode ser nulo");

            local.Validate();

            local.avaliacao = null;

            return _localRepository.Update(local);
        }



        public void UploadImagem(ImagemDto documentoDto, string tipoDocumento, string nomeArquivoOrigem, int tamanhoArquivo)
        {
            // Limite 5MB
            if (tamanhoArquivo > 5242880)
                throw new Exception("O arquivo não pode ser maior do que 5MB");

            string diretorio = string.Empty;
            List<string> extensionsAccept = new List<string>() { ".jpg", ".jpeg", ".png" };

            try
            {
                FileInfo fileInfo = new FileInfo(nomeArquivoOrigem);

                string extension = fileInfo.Extension.ToLower();

                if (!extensionsAccept.Contains(extension))
                    throw new Exception($"Não é permitido carregar imagens com extensão '{extension}'");

                string fileName = string.Format("{0}{1}", tipoDocumento, extension);

                //var ddiretorio = Path.Combine(Directory.GetCurrentDirectory(), $"{ProjectConfig.resources}", documentoDto.localId);
                diretorio = Path.Combine(Directory.GetCurrentDirectory(), "Resources", documentoDto.localId);

                documentoDto.fileName = fileName;

                SaveFile(documentoDto, diretorio);

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            try
            {
                SaveDocument(documentoDto);
            }
            catch (Exception e)
            {
                diretorio = Path.Combine(diretorio, documentoDto.fileName);
                // DELETAR ARQUIVO DA PASTA
                FileInfo fi = new FileInfo(diretorio);

                if (fi.Exists)
                    fi.Delete();

                throw new Exception(e.Message);
            }
        }


        private void SaveFile(ImagemDto documentoDto, string diretorio)
        {
            if (!Directory.Exists(diretorio))
                Directory.CreateDirectory(diretorio);


            DeleteOldFiles(diretorio, documentoDto.fileName.Substring(0, documentoDto.fileName.IndexOf(".")));


            diretorio = Path.Combine(diretorio, documentoDto.fileName);

            // copiar o buffer no arquivo
            File.WriteAllBytes(diretorio, documentoDto.file);
        }


        private void SaveDocument(ImagemDto documentoDto)
        {
            Local local = _localRepository.Get(documentoDto.localId);

            local.nomeImagem = documentoDto.fileName;

            _localRepository.Update(local);
        }


        /// <summary>
        /// Deletar todos arquivos com o mesmo nome, independente da extensão
        /// </summary>
        /// <param name="diretorio"></param>
        /// <param name="tipoDocumento"></param>
        private void DeleteOldFiles(string diretorio, string tipoDocumento)
        {
            DirectoryInfo directoryInfo = new DirectoryInfo(diretorio);
            FileInfo[] files = directoryInfo.GetFiles("*.*");
            foreach (FileInfo f in files)
            {
                if (f.Name.Substring(0, f.Name.IndexOf(".")) == tipoDocumento)
                {
                    File.Delete(Path.Combine(diretorio, f.Name));
                }
            }

        }


        private byte[] GetImage1(string fullPath)
        {
            byte[] buffer;
            //Open the stream and read it back.
            using (FileStream fs = File.OpenRead(fullPath))
            {
                buffer = TransformationUtils.ConvertStreamToByteArray(fs, Convert.ToInt32(fs.Length));
            }

            return buffer;
        }


        //public Stream GetImage(string localId)
        //{


        //    if (!string.IsNullOrWhiteSpace(localId))
        //    {
        //        //string path = $"{ProjectConfig.resources}\\{empresaId}\\{documento.nome}";
        //        string path = Path.Combine(Directory.GetCurrentDirectory(), "Resources", $"{localId}\\");
        //        string file = Directory.GetFiles(path).FirstOrDefault();

        //        if (string.IsNullOrWhiteSpace(file))
        //            return null;

        //        using (StreamReader reader = new StreamReader(file))
        //        {
        //            return reader.BaseStream;
        //        }


        //    }

        //    return null;
        //}

        public Stream GetImage11(string fullPath)
        {


            if (File.Exists(fullPath))
            {
                //string path = $"{ProjectConfig.resources}\\{empresaId}\\{documento.nome}";

                using (StreamReader reader = new StreamReader(fullPath))
                {
                    return reader.BaseStream;
                }
                

            }

            return null;
        }


        //public Stream GetImage64()
        //{


        //    if (true)
        //    {
        //        //string path = $"{ProjectConfig.resources}\\{empresaId}\\{documento.nome}";
        //        string path = Path.Combine(Directory.GetCurrentDirectory(), "Resources", "e85b2901-dbd3-47ca-84d6-056e4c916f9e\\");
        //        string file = Directory.GetFiles(path).FirstOrDefault();

        //        if (string.IsNullOrWhiteSpace(file))
        //            return null;

        //        Stream base64;
        //        using (StreamReader reader = new StreamReader(file))
        //        {
        //            base64 = TransformationUtils.ConvertToBase64(reader.BaseStream);
        //        }

        //        return base64;
        //    }

        //    return null;
        //} 
        
        public byte[] GetImage64()
        {


            using (FileStream fileStream = new FileStream("C:\\TCC\\AppTravel\\AppTravel\\AppTravel\\Resources\\e85b2901-dbd3-47ca-84d6-056e4c916f9e\\imagem.png", FileMode.Open))
            {
                using (var memoryStream = new MemoryStream())
                {
                    fileStream.CopyTo(memoryStream);
                    Bitmap image = new Bitmap(1, 1);
                    image.Save(memoryStream, ImageFormat.Jpeg);

                    byte[] byteImage = memoryStream.ToArray();
                    return byteImage;
                }
            }
        }


        public byte[] GetImage(string localId)
        {

            if (!string.IsNullOrWhiteSpace(localId))
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "Resources", $"{localId}\\");

                if (Directory.Exists(path))
                {
                    string file = Directory.GetFiles(path).FirstOrDefault();

                    using (FileStream fileStream = new FileStream(file, FileMode.Open))
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            fileStream.CopyTo(memoryStream);
                            Bitmap image = new Bitmap(1, 1);
                            image.Save(memoryStream, ImageFormat.Jpeg);

                            byte[] byteImage = memoryStream.ToArray();
                            return byteImage;
                        }
                    }
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

    }

}

