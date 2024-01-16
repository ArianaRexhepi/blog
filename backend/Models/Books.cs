using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Books
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public DateTime Year { get; set;}
        public string Image { get; set; }
        public int VisitCount { get; set; } = 0;
        
    }
}