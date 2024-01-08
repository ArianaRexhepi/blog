using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VacationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VacationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var vacation = await _context.Vacation.ToListAsync();
            return Ok(vacation);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVacationAsync(Guid id)
        {
            var existingVacation = await _context.Vacation.FindAsync(id);
            if (existingVacation == null)
            {
                return NotFound();
            }
            return Ok(existingVacation);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(VacationsAddDto vacation)
        {
            var newvacation = new Vacations
            {
                Id = new Guid(),
                Title = vacation.Title,
                Author = vacation.Author,
                Content = vacation.Content,
                Year = vacation.Year,
                Description = vacation.Description,
                Image = vacation.Image,
            };

            _context.Vacation.Add(newvacation);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Vacations vacation)
        {
            var existingVacation = await _context.Vacation.FindAsync(id);
            if (existingVacation == null)
            {
                return NotFound();
            }

            existingVacation.Title = vacation.Title;
            existingVacation.Author = vacation.Author;
            existingVacation.Content = vacation.Content;
            existingVacation.Description = vacation.Description;
            existingVacation.Image = vacation.Image;
            existingVacation.Year = vacation.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingVacation = await _context.Vacation.FindAsync(id);
            if (existingVacation == null)
            {
                return NotFound();
            }

            _context.Vacation.Remove(existingVacation);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
