using System.ComponentModel.DataAnnotations;

namespace PsiuApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "O password deve estar entre 4 e 8 caraceteres.")]
        public string Password { get; set; }

    }
}