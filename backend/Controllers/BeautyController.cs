using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeautyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BeautyController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var beauty = await _context.Beauties.ToListAsync();
            return Ok(beauty);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBeautyAsync(Guid id)
        {
            var existingBeauty = await _context.Beauties.FindAsync(id);
            if (existingBeauty == null)
            {
                return NotFound();
            }
            return Ok(existingBeauty);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(Beauty beauty)
        {
            var newbeauty = new Beauty
            {
                Id = new Guid(),
                Title = beauty.Title,
                Author = beauty.Author,
                Content = beauty.Content,
                Year = beauty.Year,
                Description = beauty.Description,
                Image = beauty.Image
            };

            _context.Beauties.Add(newbeauty);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Beauty beauty)
        {
            var existingBeauty = await _context.Beauties.FindAsync(id);
            if (existingBeauty == null)
            {
                return NotFound();
            }

            existingBeauty.Title = beauty.Title;
            existingBeauty.Author = beauty.Author;
            existingBeauty.Content = beauty.Content;
            existingBeauty.Description = beauty.Description;
            existingBeauty.Image = beauty.Image;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingBeauty = await _context.Beauties.FindAsync(id);
            if (existingBeauty == null)
            {
                return NotFound();
            }

            _context.Beauties.Remove(existingBeauty);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
