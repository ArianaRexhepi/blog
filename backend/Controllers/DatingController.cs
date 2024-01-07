using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DatingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var dating = await _context.Datings.ToListAsync();
            return Ok(dating);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDatingAsync(Guid id)
        {
            var existingDating = await _context.Datings.FindAsync(id);
            if (existingDating == null)
            {
                return NotFound();
            }
            return Ok(existingDating);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(DatingAddDto dating)
        {
            var newdating = new Dating
            {
                Id = new Guid(),
                Title = dating.Title,
                Author = dating.Author,
                Content = dating.Content,
                Year = dating.Year,
                Description = dating.Description,
                Image = dating.Image,
            };

            _context.Datings.Add(newdating);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Dating dating)
        {
            var existingDating = await _context.Datings.FindAsync(id);
            if (existingDating == null)
            {
                return NotFound();
            }

            existingDating.Title = dating.Title;
            existingDating.Author = dating.Author;
            existingDating.Content = dating.Content;
            existingDating.Description = dating.Description;
            existingDating.Image = dating.Image;
            existingDating.Year = dating.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingDating = await _context.Datings.FindAsync(id);
            if (existingDating == null)
            {
                return NotFound();
            }

            _context.Datings.Remove(existingDating);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
