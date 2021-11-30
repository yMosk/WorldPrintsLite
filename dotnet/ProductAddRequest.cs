using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Product
{
    public class ProductAddRequest
    {
        [Required]
        [StringLength(50, ErrorMessage = "The SKU value cannot exceed 50 characters.")]
        public string SKU { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "The Name value cannot exceed 255 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The Manufacturer value cannot exceed 100 characters.")]
        public string Manufacturer { get; set; }

        [Required]
        [Range(1000, 9999, ErrorMessage = "Enter a valid Year")]
        public int Year { get; set; }

        [Required]
        [StringLength(4000, ErrorMessage = "The Description value cannot exceed 4000 characters.")]
        public string Description { get; set; }

        public string Specifications { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int CategoryId { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int SizeTypeId { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int ColorId { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int ConditionTypeId { get; set; }

        [Required]
        [StringLength(250, ErrorMessage = "The Material value cannot exceed 250 characters.")]
        public string Material { get; set; }

        [Required]
        [Range(0, 1, ErrorMessage = "Please enter valid boolean Number")]
        public bool IsVisible { get; set; }

        [Required]
        [Range(0, 1, ErrorMessage = "Please enter valid boolean Number")]
        public bool IsActive { get; set; }

        [Required]
        [Url]
        public string PrimaryImage { get; set; }
    }
}