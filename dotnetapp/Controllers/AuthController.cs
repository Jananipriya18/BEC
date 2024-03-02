using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace dotnetapp.Controllers
{
   // [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CourseEnquiryDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        private readonly IUserService _userService;

        public AuthController(IUserService userService, CourseEnquiryDbContext context, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _userService = userService;
            _context = context;

        }

// public async Task<bool> Register([FromBody] User user)
// {
//     if (user == null)
//     {
//         Console.WriteLine("Invalid user data");
//         return false;
//     }

//     if (user.UserRole == "ADMIN" || user.UserRole == "STUDENT")
//     {
//         Console.WriteLine("Role: " + user.UserRole);

//        // var isRegistered = await _userService.RegisterAsync(user);
//        var isRegistered = await _userService.RegisterAsync(user);
//         Console.WriteLine("Registration status: " + isRegistered);

//         if (isRegistered)
//         {
//             var customUser = new User
//             {
//                 EmailID = user.EmailID,
//                 Password = user.Password,
//                 UserRole = user.UserRole.ToUpper(),
//                 UserName = user.UserName,
//                 MobileNumber = user.MobileNumber
//             };

//             // Add the customUser to the DbSet and save it
//             _context.Users.Add(customUser);
//             await _context.SaveChangesAsync();

//             return true; // Registration was successful
//         }
//     }

//     Console.WriteLine("Registration failed. Email may already exist.");
//     return false; // Registration failed
// }

[HttpPost("/auth/register")]
public async Task<bool> Register([FromBody] User user)
{
    if (user == null)
    {
        Console.WriteLine("Invalid user data");
        return false;
    }

    if (user.UserRole == "ADMIN" || user.UserRole == "STUDENT")
    {
        Console.WriteLine("Role: " + user.UserRole);

       var isRegistered = await _userService.RegisterAsync(user);
        Console.WriteLine("Registration status: " + isRegistered);

        if (isRegistered)
        {
            var customUser = new User
            {
                EmailID = user.EmailID,
                Password = user.Password,
                UserRole = user.UserRole.ToUpper(),
                UserName = user.UserName,
                MobileNumber = user.MobileNumber
            };

            // Add the customUser to the DbSet and save it
            _context.Users.Add(customUser);
            await _context.SaveChangesAsync();

            return true; // Registration was successful
        }
    }

    Console.WriteLine("Registration failed. Email may already exist.");
    return false; // Registration failed
}

        [HttpPost("/auth/login")]
public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
{
    if (request == null || string.IsNullOrWhiteSpace(request.EmailID) || string.IsNullOrWhiteSpace(request.Password))
        return BadRequest("Invalid login request");
    var token = await _userService.LoginAsync(request.EmailID, request.Password);
Console.WriteLine("Hello "+request.EmailID+" :"+request.Password);
    if (token == null)
        return Unauthorized("Invalid email or password");

    // Retrieve the user from UserManager to get their roles
    var user = await _userManager.FindByEmailAsync(request.EmailID);

    if (user == null)
        return Unauthorized("User not found");

    var role = await _userManager.GetRolesAsync(user);

    return Ok(new
    {
        Token = token,
        Username = user.UserName,
         Role = role[0].ToString(),
         UserId=user.Id // Combine roles into a comma-separated string
        //Roles = string.Join(",", role) // Combine roles into a comma-separated string
    });
}

[HttpGet("/api/student")]
public async Task<IActionResult> GetRegisteredStudents()
{
    var students = await _userManager.GetUsersInRoleAsync("STUDENT");

    if (students == null || !students.Any())
        return NotFound("No students found");

    var studentDetails = students.Select(student => new
    {
        UserName = student.UserName,
        Email = student.Email
    });

    return Ok(studentDetails);
}

    }
}
