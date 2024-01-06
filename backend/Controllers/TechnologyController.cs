using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TechnologyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TechnologyController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var tech = await _context.Technologies.ToListAsync();
            return Ok(tech);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTechAsync(Guid id)
        {
            var existingTech = await _context.Technologies.FindAsync(id);
            if (existingTech == null)
            {
                return NotFound();
            }
            return Ok(existingTech);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(TechnologyAddDto tech)
        {
            var newtech = new Technology
            {
                Id = new Guid(),
                Title = tech.Title,
                Author = tech.Author,
                Content = tech.Content,
                Year = tech.Year,
                Description = tech.Description,
                Image = tech.Image
            };

            _context.Technologies.Add(newtech);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Technology tech)
        {
            var existingTech = await _context.Technologies.FindAsync(id);
            if (existingTech == null)
            {
                return NotFound();
            }

            existingTech.Title = tech.Title;
            existingTech.Author = tech.Author;
            existingTech.Content = tech.Content;
            existingTech.Description = tech.Description;
            existingTech.Image = tech.Image;
            existingTech.Year = tech.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingTech = await _context.Technologies.FindAsync(id);
            if (existingTech == null)
            {
                return NotFound();
            }

            _context.Technologies.Remove(existingTech);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
