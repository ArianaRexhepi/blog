using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
         public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Books> Book { get; set; }

        internal Task<int> SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}