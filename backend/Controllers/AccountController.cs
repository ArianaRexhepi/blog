using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using backend.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using back.Models;
using backend.Data;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;
        public readonly SignInManager<AppUser> _signInManager;
        public readonly IHttpContextAccessor _accessor;
        public readonly ApplicationDbContext _context;
        public AccountController(IConfiguration configuration, SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IHttpContextAccessor accessor, ApplicationDbContext context)
        {
            _context = context;
            _accessor = accessor;
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        // Get's the user by the token that is sent
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<AppUserDto>> GetUser()
        {
            var email = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var role = await GetUserRole(user);
                return CreateUserObject(user, role);
            }
            else
            {
                return Unauthorized("Unauthorized no user found");
            }
        }

        [HttpGet("GetAllUsers")]
        [Authorize]
        public async Task<ActionResult<AppUserDto>> GetAllUser()
        {
            var users = await _context.Users.ToListAsync();

            var usersDto = new List<AppUserDto>();

            foreach (var user in users)
            {
                var role = await GetUserRole(user);
                var userDto = CreateUserObject(user, role);
                usersDto.Add(userDto);
            }
            return Ok(usersDto);
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<AppUserDto>> CreateUser(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            await _userManager.AddToRoleAsync(user, Roles.User.ToString());

            var role = await GetUserRole(user);

            if (result.Succeeded)
            {
                return CreateUserObject(user, role);
            }
            else
            {
                return BadRequest("User failed to register!");
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(a => a.Email == loginDto.Email);

            if (user == null)
            {
                return BadRequest("Invalid Email");
            }

            var roles = await GetUserRole(user);

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user, roles);
            }
            else
            {
                return BadRequest("Invalid password");
            }
        }

        private async Task<List<string>> GetUserRole(AppUser user)
        {
            return new List<string>(await _userManager.GetRolesAsync(user));
        }

        private AppUserDto CreateUserObject(AppUser user, List<string> roles)
        {
            return new AppUserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Token = GenerateJwtToken(user, roles),
                UserRoles = roles,
            };
        }

        private string GenerateJwtToken(AppUser user, List<string> roles)
        {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.Email,user.Email),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt"]));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}