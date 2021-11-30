using System.ComponentModel.DataAnnotations;
                           
namespace Sabio.Models.Requests.Email
{
    public class EmailSendRequest
    {
        [Required]
        [RegularExpression(@"\A[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z")]
        public string Email { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
    }
}
