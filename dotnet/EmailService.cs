using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Sabio.Models.AppSettings;
using Sabio.Models.Requests.Email;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.AspNetCore.Hosting;


namespace Sabio.Services
{
    public class EmailService : IEmailService
    {
        private AppKeys _appKeys = null;
        private IWebHostEnvironment _environment = null;

        public EmailService(IOptions<AppKeys> appKeys
            , IWebHostEnvironment environment)
        {
            _appKeys = appKeys.Value;
            _environment = environment;
        }

        public async Task SubscriptionEmail(EmailSendRequest email)
        {
            SendGridMessage msg = new SendGridMessage()
            {
                From = new EmailAddress("some@example.email", "Admin"),
                Subject = email.Subject,
                PlainTextContent = "Thank you. Your subscription has been confirmed. You've been added to our list and will hear from us soon. World Prints",
                HtmlContent = System.IO.File.ReadAllText(_environment.WebRootPath + "/EmailTemplates/Subscription.html"),
            };
            msg.AddTo(new EmailAddress(email.Email, email.Name));
            msg.HtmlContent = msg.HtmlContent.Replace("{{&&subject}}", msg.Subject);

            await SendEmail(msg).ConfigureAwait(false);
        }

        private async Task SendEmail(SendGridMessage msg)
        {
            var client = new SendGridClient(_appKeys.SendGridAppKey);
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception(response.StatusCode.ToString());
            }

        }
    }
}
