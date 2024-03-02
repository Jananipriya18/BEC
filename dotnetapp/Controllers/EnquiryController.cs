using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class EnquiryController : ControllerBase
    {
        private readonly CourseEnquiryDbContext _context;

        public EnquiryController(CourseEnquiryDbContext context)
        {
            _context = context;
        }

        [HttpGet("/api/Enquiry")]
        public async Task<ActionResult<IEnumerable<Enquiry>>> GetAllEnquiries()
        {
            var enquirys = await _context.Enquires.ToListAsync();
            return Ok(enquirys);
        }

        [HttpPost("/api/Enquiry")]
        public async Task<ActionResult> AddEnquiry(Enquiry enquiry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return detailed validation errors
            }
            await _context.Enquires.AddAsync(enquiry);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete("/api/Enquiry/{id}")]
        public async Task<IActionResult> DeleteEnquiry(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Enquiry id");

            var enquiry = await _context.Enquires.FindAsync(id);
              _context.Enquires.Remove(enquiry);
                await _context.SaveChangesAsync();
            return NoContent();
        }
         [HttpGet("/api/user/{userId}")]
public async Task<ActionResult<IEnumerable<Enquiry>>> GetEnquiryByUserId(string userId)
{
    if (string.IsNullOrEmpty(userId))
    {
        return BadRequest("UserId is required");
    }

    var myEnquiry = await _context.Enquires
        .Where(l => l.userId == userId)
        .ToListAsync();

    if (myEnquiry == null || !myEnquiry.Any())
    {
        return NotFound("No Enquiry found for the provided userId");
    }

    return Ok(myEnquiry);
}
         [HttpPut("/api/Enquiry/{id}")]
        public async Task<IActionResult> EditEnquiry(int id, Enquiry updatedEnquiry)
        {
            if (id <= 0)
                return BadRequest("Not a valid Enquiry id");

            var existingEnquiry = await _context.Enquires.FindAsync(id);

            if (existingEnquiry == null)
                return NotFound("Enquiry not found");

            // Update the fields of the existing application
            existingEnquiry.EnquiryDate = updatedEnquiry.EnquiryDate;
            existingEnquiry.Title = updatedEnquiry.Title;
            existingEnquiry.Description = updatedEnquiry.Description;
            existingEnquiry.EmailID = updatedEnquiry.EmailID;
            existingEnquiry.EnquiryType = updatedEnquiry.EnquiryType;
           // existingEnquiry.CourseName = updatedEnquiry.CourseName;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut("/api/Enquiry/{id}/status")]
      //  [Authorize(Roles = "Admin")] // Restrict access to users with the "Admin" role
        public async Task<IActionResult> UpdateEnquiryStatus(int id, string status)
        {
            var enquiry = await _context.Enquires.FindAsync(id);

            if (enquiry == null)
                return NotFound("Enquiry not found");

            enquiry.Status = status;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
