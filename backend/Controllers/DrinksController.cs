using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DrinksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DrinksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var drink = await _context.Drink.ToListAsync();
            return Ok(drink);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDrinksAsync(Guid id)
        {
            var existingDrink = await _context.Drink.FindAsync(id);
            if (existingDrink == null)
            {
                return NotFound();
            }
            return Ok(existingDrink);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(DrinksAddDto drink)
        {
            var newdrink = new Drinks
            {
                Id = new Guid(),
                Title = drink.Title,
                Author = drink.Author,
                Content = drink.Content,
                Year = drink.Year,
                Description = drink.Description,
                Image = drink.Image
            };

            _context.Drink.Add(newdrink);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Drinks drink)
        {
            var existingDrink = await _context.Drink.FindAsync(id);
            if (existingDrink == null)
            {
                return NotFound();
            }

            existingDrink.Title = drink.Title;
            existingDrink.Author = drink.Author;
            existingDrink.Content = drink.Content;
            existingDrink.Description = drink.Description;
            existingDrink.Image = drink.Image;
            existingDrink.Year = drink.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingDrink = await _context.Drink.FindAsync(id);
            if (existingDrink == null)
            {
                return NotFound();
            }

            _context.Drink.Remove(existingDrink);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
