using System;
using System.Collections.Generic;

namespace AppTravel.Domain.Interfaces
{
    public interface ICrudRepository<T> where T : class
    {
        T Create(T obj);
        T Get(string id);
        ICollection<T> GetAll();
        T Update(T obj);
        void Delete(T obj);
    }
}
