using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
         public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Books> Books { get; set; }

        internal Task<int> SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}