using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Product;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductApiController : BaseApiController
    {
        private IProductService _service = null;
        private IAuthenticationService<int> _authService;

        public ProductApiController(IProductService svc, IAuthenticationService<int> authSerice, ILogger<PingApiController> logger) : base(logger)
        {
            _service = svc;
            _authService = authSerice;
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Product>>> Search(int pageIndex, int pageSize, string query)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<Product> pagedList = _service.Search(pageIndex, pageSize, query);
                if (pagedList == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Products Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Product>> { Item = pagedList };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Product>>> GetAllPaginated(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<Product> pagedList = _service.GetAll(pageIndex, pageSize);
                if (pagedList == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Products Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Product>> { Item = pagedList };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Product>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Product product = _service.GetById(id);

                if (product.Name == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Product not found.");
                }
                else
                {
                    response = new ItemResponse<Product> { Item = product };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("current")]
        public ActionResult<ItemResponse<Paged<Product>>> GetCurrent(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();
            try
            {
                Paged<Product> pagedList = _service.GetCurrent(pageIndex, pageSize, userId);
                if (pagedList == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Products Not Fount");
                }
                else
                {
                    response = new ItemResponse<Paged<Product>> { Item = pagedList };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpPost("")]
        public ActionResult<ItemResponse<int>> Create(ProductAddRequest product)
        {
            int iCode = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                int id = _service.Add(product, userId);
                response = new ItemResponse<int> { Item = id };
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ProductUpdateRequest product)
        {
            int iCode = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                _service.Update(product, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response); ;
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }
    }
}