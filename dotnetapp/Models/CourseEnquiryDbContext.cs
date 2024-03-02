using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

public class CourseEnquiryDbContext : IdentityDbContext<IdentityUser>
{
    public CourseEnquiryDbContext(DbContextOptions<CourseEnquiryDbContext> options)
        : base(options)
    {
    }

    public DbSet<Course> Courses { get; set; }
     public DbSet<Payment> Payments { get; set; }
    public DbSet<Enquiry> Enquires { get; set; }
     public DbSet<User> Users { get; set; }
}
