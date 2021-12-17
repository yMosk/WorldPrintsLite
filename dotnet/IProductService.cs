using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Product;

namespace Sabio.Services
{
    public interface IProductService
    {
        Paged<Product> Search(int pageIndex, int pageSize, string query);
        Paged<Product> GetAll(int pageIndex, int pageSize);
        Product GetById(int id);
        Paged<Product> GetCurrent(int pageIndex, int pageSize, int userId);
        int Add(ProductAddRequest request, int userId);
        void Update(ProductUpdateRequest request, int userId);
        void Delete(int id);
        Paged<Product> Filter(ProductFilterRequest filters, int pageIndex, int pageSize);
    }
}