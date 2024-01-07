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
        public DbSet<Movies> Movie { get; set; }
        public DbSet<GiftIdeas> GiftIdea { get; set; }
        public DbSet<Technology> Technologies { get; set; }
        public DbSet<Drinks> Drink { get; set; }
        public DbSet<Beauty> Beauties { get; set; }
        public DbSet<Fashion> Fashions { get; set; }
        public DbSet<Dating> Datings { get; set; }
        public DbSet<Packing> Packings { get; set; }
        public DbSet<Recepies> Recepie { get; set; }
    }
}