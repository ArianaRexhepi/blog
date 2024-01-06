using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var books = await _context.Book.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooksAsync(Guid id)
        {
            var existingBook = await _context.Book.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            return Ok(existingBook);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(BookAddDto book)
        {
            var newbook = new Books
            {
                Id = new Guid(),
                Title = book.Title,
                Author = book.Author,
                Genre = book.Genre,
                Content = book.Content,
                Description = book.Description,
                Image = book.Image,
                Year = book.Year
            };

            _context.Book.Add(newbook);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Books books)
        {
            var existingBook = await _context.Book.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = books.Title;
            existingBook.Author = books.Author;
            existingBook.Genre = books.Genre;
            existingBook.Content = books.Content;
            existingBook.Description = books.Description;
            existingBook.Image = books.Image;
            existingBook.Year = books.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingBook = await _context.Book.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Book.Remove(existingBook);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
