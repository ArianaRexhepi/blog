using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FriendshipsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FriendshipsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var friendship = await _context.Friendship.ToListAsync();
            return Ok(friendship);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFriendshipAsync(Guid id)
        {
            var existingFriendship = await _context.Friendship.FindAsync(id);
            if (existingFriendship == null)
            {
                return NotFound();
            }
            return Ok(existingFriendship);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(FriendshipsAddDto friendship)
        {
            var newfriendship= new Friendships
            {
                Id = new Guid(),
                Title = friendship.Title,
                Author = friendship.Author,
                Content = friendship.Content,
                Year = friendship.Year,
                Description = friendship.Description,
                Image = friendship.Image,
            };

            _context.Friendship.Add(newfriendship);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Friendships friendship)
        {
            var existingFriendship = await _context.Friendship.FindAsync(id);
            if (existingFriendship == null)
            {
                return NotFound();
            }

            existingFriendship.Title = friendship.Title;
            existingFriendship.Author = friendship.Author;
            existingFriendship.Content = friendship.Content;
            existingFriendship.Description = friendship.Description;
            existingFriendship.Image = friendship.Image;
            existingFriendship.Year = friendship.Year;


            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("VisitCount/{id}")]
        public async Task<IActionResult> PutVisitAsync(Guid id)
        {
            var existingFriendship = await _context.Friendship.FindAsync(id);
            if (existingFriendship == null)
            {
                return NotFound();
            }
            existingFriendship.VisitCount++;

            _context.SaveChanges();

            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingFriendship = await _context.Friendship.FindAsync(id);
            if (existingFriendship == null)
            {
                return NotFound();
            }

            _context.Friendship.Remove(existingFriendship);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
