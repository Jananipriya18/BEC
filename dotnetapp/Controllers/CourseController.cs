using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly CourseEnquiryDbContext _context;

        public CourseController(CourseEnquiryDbContext context)
        {
            _context = context;
        }

        [HttpGet("/api/course")]
        public async Task<ActionResult<IEnumerable<Course>>> GetAllCourses()
        {
            var courses = await _context.Courses.ToListAsync();
            return Ok(courses);
        }
[HttpGet("/api/Course/CourseName")]
public async Task<ActionResult<IEnumerable<string>>> Get()
{
    // Project the CourseTitle property using Select
    var CourseTitles = await _context.Courses
        .OrderBy(x => x.CourseName)
        .Select(x => x.CourseName)
        .ToListAsync();

    return CourseTitles;
}
        [HttpPost("/api/Course")]
        public async Task<ActionResult> AddCourse(Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return detailed validation errors
            }
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete("/api/Course/{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Course id");

            var course = await _context.Courses.FindAsync(id);
              _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("/api/Course/{id}")]
        public async Task<IActionResult> EditCourse(int id, Course updatedCourse)
        {
            if (id <= 0)
                return BadRequest("Not a valid Course id");

            var existingCourse = await _context.Courses.FindAsync(id);

            if (existingCourse == null)
                return NotFound("Course not found");

            // Update the fields of the existing application
            existingCourse.CourseName = updatedCourse.CourseName;
            existingCourse.Description = updatedCourse.Description;
            existingCourse.Duration = updatedCourse.Duration;
            existingCourse.Cost = updatedCourse.Cost;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            return NoContent();
        }
    
     [HttpGet("/api/Student/Course")]
        public async Task<ActionResult<IEnumerable<Course>>> GetAllStudentCourses()
        {
            var courses = await _context.Courses.ToListAsync();
            return Ok(courses);
        }
    }
}
