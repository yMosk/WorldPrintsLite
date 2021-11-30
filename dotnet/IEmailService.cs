using Sabio.Models.Requests.Email;
using System;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IEmailService
    {
        Task SubscriptionEmail(EmailSendRequest email);
        Task RegistrationEmail(string email, Guid token);
    }
}