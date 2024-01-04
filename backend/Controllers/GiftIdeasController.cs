using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GiftIdeasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GiftIdeasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var gifts = await _context.GiftIdea.ToListAsync();
            return Ok(gifts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGiftsAsync(Guid id)
        {
            var existingGifts = await _context.GiftIdea.FindAsync(id);
            if (existingGifts == null)
            {
                return NotFound();
            }
            return Ok(existingGifts);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(GiftIdeasAddDto gift)
        {
            var newgift = new GiftIdeas
            {
                Id = new Guid(),
                Title = gift.Title,
                Author = gift.Author,
                Content = gift.Content,
                Description = gift.Description,
                Image = gift.Image
            };

            _context.GiftIdea.Add(newgift);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, GiftIdeas gift)
        {
            var existingGifts = await _context.GiftIdea.FindAsync(id);
            if (existingGifts == null)
            {
                return NotFound();
            }

            existingGifts.Title = gift.Title;
            existingGifts.Author = gift.Author;
            existingGifts.Content = gift.Content;
            existingGifts.Description = gift.Description;
            existingGifts.Image = gift.Image;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingGifts = await _context.GiftIdea.FindAsync(id);
            if (existingGifts == null)
            {
                return NotFound();
            }

            _context.GiftIdea.Remove(existingGifts);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
