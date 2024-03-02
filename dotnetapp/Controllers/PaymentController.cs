using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
   [Route("api/course/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly CourseEnquiryDbContext _context;

        public PaymentController(CourseEnquiryDbContext context)
        {
            _context = context;
        }
        // GET: api/Payment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            return await _context.Payments.ToListAsync();
        }

       // GET: api/Payment/5
        // POST: api/Payment
        [HttpPost]
        public async Task<ActionResult<Payment>> PostPayment(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            //return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment);
            return Ok();
        }

    }
}
