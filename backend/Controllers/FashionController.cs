using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FashionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FashionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var fashion = await _context.Fashions.ToListAsync();
            return Ok(fashion);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFashionAsync(Guid id)
        {
            var existingFashion = await _context.Fashions.FindAsync(id);
            if (existingFashion == null)
            {
                return NotFound();
            }
            return Ok(existingFashion);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(FashionAddDto fashion)
        {
            var newfashion = new Fashion
            {
                Id = new Guid(),
                Title = fashion.Title,
                Author = fashion.Author,
                Content = fashion.Content,
                Year = fashion.Year,
                Description = fashion.Description,
                Image = fashion.Image,
            };

            _context.Fashions.Add(newfashion);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Fashion fashion)
        {
            var existingFashion = await _context.Fashions.FindAsync(id);
            if (existingFashion == null)
            {
                return NotFound();
            }

            existingFashion.Title = fashion.Title;
            existingFashion.Author = fashion.Author;
            existingFashion.Content = fashion.Content;
            existingFashion.Description = fashion.Description;
            existingFashion.Image = fashion.Image;
            existingFashion.Year = fashion.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingFashion = await _context.Fashions.FindAsync(id);
            if (existingFashion == null)
            {
                return NotFound();
            }

            _context.Fashions.Remove(existingFashion);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
