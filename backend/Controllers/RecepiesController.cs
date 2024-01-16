using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecepiesController : ControllerBase
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
            var existingRecepie = await _context.Recepie.FindAsync(id);
            if (existingRecepie == null)
            {
                return NotFound();
            }
            return Ok(existingRecepie);
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
            var existingRecepie = await _context.Recepie.FindAsync(id);
            if (existingRecepie == null)
            {
                return NotFound();
            }

            existingRecepie.Title = recepie.Title;
            existingRecepie.Author = recepie.Author;
            existingRecepie.Content = recepie.Content;
            existingRecepie.Description = recepie.Description;
            existingRecepie.Image = recepie.Image;
            existingRecepie.Year = recepie.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("VisitCount/{id}")]
        public async Task<IActionResult> PutVisitAsync(Guid id)
        {
            var existingRecepie = await _context.Recepie.FindAsync(id);
            if (existingRecepie == null)
            {
                return NotFound();
            }
            existingRecepie.VisitCount++;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingRecepie = await _context.Recepie.FindAsync(id);
            if (existingRecepie == null)
            {
                return NotFound();
            }

            _context.Recepie.Remove(existingRecepie);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
