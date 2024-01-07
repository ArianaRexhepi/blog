using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class RecepiesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RecepiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var recepie = await _context.Recepie.ToListAsync();
            return Ok(recepie);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecepieAsync(Guid id)
        {
            var existingrecepie = await _context.Recepie.FindAsync(id);
            if (existingrecepie == null)
            {
                return NotFound();
            }
            return Ok(existingrecepie);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(RecepiesAddDto recepie)
        {
            var newrecepie = new Recepies
            {
                Id = new Guid(),
                Title = recepie.Title,
                Author = recepie.Author,
                Content = recepie.Content,
                Year = recepie.Year,
                Description = recepie.Description,
                Image = recepie.Image,
            };

            _context.Recepie.Add(newrecepie);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Recepies recepie)
        {
            var existingrecepie = await _context.Recepie.FindAsync(id);
            if (existingrecepie == null)
            {
                return NotFound();
            }

            existingrecepie.Title = recepie.Title;
            existingrecepie.Author = recepie.Author;
            existingrecepie.Content = recepie.Content;
            existingrecepie.Description = recepie.Description;
            existingrecepie.Image = recepie.Image;
            existingrecepie.Year = recepie.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingrecepie = await _context.Recepie.FindAsync(id);
            if (existingrecepie == null)
            {
                return NotFound();
            }

            _context.Recepie.Remove(existingrecepie);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}