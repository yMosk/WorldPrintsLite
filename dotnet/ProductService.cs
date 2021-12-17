using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Product;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class ProductService : IProductService
    {
        IDataProvider _data = null;

        public ProductService(IDataProvider data)
        {
            _data = data;
        }

        public Paged<Product> Search(int pageIndex, int pageSize, string query)
        {
            Paged<Product> pagedList = null;
            List<Product> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Products_Search]";

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@query", query);
                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Product product = MapProduct(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Product>();
                    }

                    list.Add(product);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Product>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<Product> GetAll(int pageIndex, int pageSize)
        {
            Paged<Product> pagedList = null;
            List<Product> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Products_SelectAll]";

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Product product = MapProduct(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Product>();
                    }

                    list.Add(product);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Product>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Product GetById(int id)
        {
            Product product = new Product();
            string procName = "[dbo].[Products_Select_ById]";

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    product = MapProduct(reader, ref startingIndex);
                }
            );
            return product;
        }
        public Paged<Product> GetCurrent(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Product> pagedList = null;
            List<Product> list = null;
            int totalCount = 0;
            string procName = "[Products_Select_ByCreatedBy]";

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@CreatedBy", createdBy);
                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Product product = MapProduct(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Product>();
                    }

                    list.Add(product);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Product>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public int Add(ProductAddRequest request, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Products_Insert]";


            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddProduct(request, col);
                    col.AddWithValue("@createdBy", userId);
                    col.AddWithValue("@modifiedBy", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                }
            );
            return id;
        }
        public void Update(ProductUpdateRequest request, int userId)
        {
            string procName = "[dbo].[Products_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddProduct(request, col);
                    col.AddWithValue("@modifiedBy", userId);
                    col.AddWithValue("@id", request.Id);
                },
                returnParameters: null
            );
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Products_Delete_ById]";

            _data.ExecuteNonQuery(procName,
                 inputParamMapper: delegate (SqlParameterCollection col)
                 {
                     col.AddWithValue("@id", id);
                 },
                 returnParameters: null
                );
        }

        public Paged<Product> Filter(ProductFilterRequest filters, int pageIndex, int pageSize)
        {
            Paged<Product> pagedList = null;
            List<Product> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Products_Filter]";

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@pageIndex", pageIndex);
                    col.AddWithValue("@pageSize", pageSize);

                    #region FilterParam null checks
                    if (filters.Manufacturer != null)
                    {
                        col.AddWithValue("@manufacturer", filters.Manufacturer);
                    }
                    else
                    {
                        col.AddWithValue("@manufacturer", DBNull.Value);
                    }
                    if (filters.Material != null)
                    {
                        col.AddWithValue("@material", filters.Material);
                    }
                    else
                    {
                        col.AddWithValue("@material", DBNull.Value);
                    }
                    if (filters.Year > 0)
                    {
                        col.AddWithValue("@year", filters.Year);
                    }
                    else
                    {
                        col.AddWithValue("@year", DBNull.Value);
                    }
                    if (filters.SizeId > 0)
                    {
                        col.AddWithValue("@sizeId", filters.SizeId);
                    }
                    else
                    {
                        col.AddWithValue("@sizeId", DBNull.Value);
                    }
                    if (filters.ColorId > 0)
                    {
                        col.AddWithValue("@colorId", filters.ColorId);
                    }
                    else
                    {
                        col.AddWithValue("@colorId", DBNull.Value);
                    }
                    if (filters.ConditionId > 0)
                    {
                        col.AddWithValue("@conditionId", filters.ConditionId);
                    }
                    else
                    {
                        col.AddWithValue("@conditionId", DBNull.Value);
                    }
                    if (filters.CategoryId > 0)
                    {
                        col.AddWithValue("@categoryId", filters.CategoryId);
                    }
                    else
                    {
                        col.AddWithValue("@categoryId", DBNull.Value);
                    }
                    #endregion
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Product product = MapProduct(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Product>();
                    }

                    list.Add(product);
                }
                );

            if (list != null)
            {
                pagedList = new Paged<Product>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        private static void AddProduct(ProductAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@sku", request.SKU);
            col.AddWithValue("@name", request.Name);
            col.AddWithValue("@manufacturer", request.Manufacturer);
            col.AddWithValue("@year", request.Year);
            col.AddWithValue("@description", request.Description);
            col.AddWithValue("@specifications", request.Specifications);
            col.AddWithValue("@categoryId", request.CategoryId);
            col.AddWithValue("@productSizeTypeId", request.SizeTypeId);
            col.AddWithValue("@colorId", request.ColorId);
            col.AddWithValue("@conditionTypeId", request.ConditionTypeId);
            col.AddWithValue("@material", request.Material);
            col.AddWithValue("@isVisible", request.IsVisible);
            col.AddWithValue("@isActive", request.IsActive);
            col.AddWithValue("@primaryImage", request.PrimaryImage);
        }
        private static Product MapProduct(IDataReader reader, ref int startingIndex)
        {
            Product product = new Product();

            product.Id = reader.GetSafeInt32(startingIndex++);
            product.SKU = reader.GetSafeString(startingIndex++);
            product.Name = reader.GetSafeString(startingIndex++);
            product.Manufacturer = reader.GetSafeString(startingIndex++);
            product.Year = reader.GetSafeInt32(startingIndex++);
            product.Description = reader.GetSafeString(startingIndex++);
            product.Specifications = reader.GetSafeString(startingIndex++);

            product.Category = new ProductCategory();
            product.Category.Id = reader.GetSafeInt32(startingIndex++);
            product.Category.Name = reader.GetSafeString(startingIndex++);
            product.Category.Description = reader.GetSafeString(startingIndex++);
            product.Category.ImageId = reader.GetSafeInt32(startingIndex++);

            product.SizeType = new LookUp();
            product.SizeType.Id = reader.GetSafeInt32(startingIndex++);
            product.SizeType.Name = reader.GetSafeString(startingIndex++);

            product.Color = new Color();
            product.Color.Id = reader.GetSafeInt32(startingIndex++);
            product.Color.Name = reader.GetSafeString(startingIndex++);
            product.Color.Hex = reader.GetSafeString(startingIndex++);

            product.ConditionType = new LookUp();
            product.ConditionType.Id = reader.GetSafeInt32(startingIndex++);
            product.ConditionType.Name = reader.GetSafeString(startingIndex++);

            product.Material = reader.GetSafeString(startingIndex++);
            product.IsVisible = reader.GetSafeBool(startingIndex++);
            product.IsActive = reader.GetSafeBool(startingIndex++);
            product.PrimaryImage = reader.GetSafeString(startingIndex++);

            product.CreatedBy = new User();
            product.CreatedBy.Id = reader.GetSafeInt32(startingIndex++);
            product.CreatedBy.FirstName = reader.GetSafeString(startingIndex++);
            product.CreatedBy.LastName = reader.GetSafeString(startingIndex++);
            product.CreatedBy.AvatarUrl = reader.GetSafeString(startingIndex++);

            product.ModifiedBy = new User();
            product.ModifiedBy.Id = reader.GetSafeInt32(startingIndex++);
            product.ModifiedBy.FirstName = reader.GetSafeString(startingIndex++);
            product.ModifiedBy.LastName = reader.GetSafeString(startingIndex++);
            product.ModifiedBy.AvatarUrl = reader.GetSafeString(startingIndex++);

            product.DateCreated = reader.GetDateTime(startingIndex++);
            product.DateModified = reader.GetDateTime(startingIndex++);
            return product;
        }
    }
}