using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class AppUser : IdentityUser
{
    public string Name { get; set; }
    public ICollection<Books> Book { get; set; }
}
}