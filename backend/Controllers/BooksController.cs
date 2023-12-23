using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public readonly IHttpContextAccessor _accessor;

        public BooksController(ApplicationDbContext context, IHttpContextAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var books = await _context.Book.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookAsync(int id)
        {
            var existingBook = await _context.Book.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            return Ok(existingBook);
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync(Books book)
        {
            _context.Book.Add(book);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, Books book)
        {
            var existingBook = await _context.Book.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Content = book.Content;
            existingBook.Rating = book.Rating;
            existingBook.Genre = book.Genre;
            existingBook.Year = book.Year;
            existingBook.Image = book.Image;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
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

        // [HttpGet("userFavourite")]
        // public async Task<IActionResult> GetFavorites()
        // {
        //     var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
        //     var user = await _context.Users.Include(a => a.Books).FirstOrDefaultAsync(a => a.Email == userEmail);

        //     return Ok(user.Books);
        // }

        // [HttpGet("userFavourite/{id}")]
        // public async Task<IActionResult> GetFavorites(int id)
        // {
        //     var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
        //     var user = await _context.Users.Include(a => a.Books).FirstOrDefaultAsync(a => a.Email == userEmail);

        //     var book = user.Books.Where(a => a.Id == id).FirstOrDefault();

        //     return Ok(book);
        // }

        // [HttpPost("addFavorite")]
        // public async Task<IActionResult> FavoriteAsync(Book book)
        // {
        //     var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
        //     var user = await _context.Users.Include(a => a.Books).FirstOrDefaultAsync(a => a.Email == userEmail);

        //     user.Books.Add(book);

        //     await _context.SaveChangesAsync();

        //     return Ok();

        // }
        // [HttpDelete("removeFavorite/{id}")]
        // public async Task<IActionResult> RemoveFavorite(int id)
        // {
        //     var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
        //     var user = await _context.Users.Include(a => a.Books).FirstOrDefaultAsync(a => a.Email == userEmail);

        //     var userBook = user.Books.Where(a => a.Id == id).FirstOrDefault();

        //     user.Books.Remove(userBook);

        //     await _context.SaveChangesAsync();

        //     return Ok();
        // }
    }
}
