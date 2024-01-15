using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MoviesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var movies = await _context.Movie.ToListAsync();
            return Ok(movies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMoviesAsync(Guid id)
        {
            var existingMovie = await _context.Movie.FindAsync(id);
            if (existingMovie == null)
            {
                return NotFound();
            }
            return Ok(existingMovie);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(MoviesAddDto movies)
        {
            var newmovie = new Movies
            {
                Id = new Guid(),
                Title = movies.Title,
                Author = movies.Author,
                Genre = movies.Genre,
                Content = movies.Content,
                Description = movies.Description,
                Image = movies.Image,
                Year = movies.Year
            };

            _context.Movie.Add(newmovie);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Movies movies)
        {
            var existingMovie = await _context.Movie.FindAsync(id);
            if (existingMovie == null)
            {
                return NotFound();
            }

            existingMovie.Title = movies.Title;
            existingMovie.Author = movies.Author;
            existingMovie.Genre = movies.Genre;
            existingMovie.Content = movies.Content;
            existingMovie.Description = movies.Description;
            existingMovie.Image = movies.Image;
            existingMovie.Year = movies.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("VisitCount/{id}")]
        public async Task<IActionResult> PutVisitAsync(Guid id)
        {
            var existingMovie = await _context.Movie.FindAsync(id);
            if (existingMovie == null)
            {
                return NotFound();
            }
            existingMovie.VisitCount++;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingMovie = await _context.Movie.FindAsync(id);
            if (existingMovie == null)
            {
                return NotFound();
            }

            _context.Movie.Remove(existingMovie);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
