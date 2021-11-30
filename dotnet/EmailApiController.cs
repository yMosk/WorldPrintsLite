using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Requests.Email;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class EmailApiController : BaseApiController
    {
        private IEmailService _service = null;
        private IAuthenticationService<int> _authService = null;
        public EmailApiController(IEmailService service
            , ILogger<EmailApiController> logger
            , IAuthenticationService<int> authService) :base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult<SuccessResponse>> SendEmail(EmailSendRequest email)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                await _service.SubscriptionEmail(email);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

    }
}