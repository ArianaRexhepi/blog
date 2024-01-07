using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PackingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var packing = await _context.Packings.ToListAsync();
            return Ok(packing);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBeautyAsync(Guid id)
        {
            var existingPacking = await _context.Packings.FindAsync(id);
            if (existingPacking == null)
            {
                return NotFound();
            }
            return Ok(existingPacking);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(PackingAddDto packing)
        {
            var newpacking = new Packing
            {
                Id = new Guid(),
                Title = packing.Title,
                Author = packing.Author,
                Content = packing.Content,
                Year = packing.Year,
                Description = packing.Description,
                Image = packing.Image,
            };

            _context.Packings.Add(newpacking);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Packing packing)
        {
            var existingPacking = await _context.Packings.FindAsync(id);
            if (existingPacking == null)
            {
                return NotFound();
            }

            existingPacking.Title = packing.Title;
            existingPacking.Author = packing.Author;
            existingPacking.Content = packing.Content;
            existingPacking.Description = packing.Description;
            existingPacking.Image = packing.Image;
            existingPacking.Year = packing.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingPacking = await _context.Packings.FindAsync(id);
            if (existingPacking == null)
            {
                return NotFound();
            }

            _context.Packings.Remove(existingPacking);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
